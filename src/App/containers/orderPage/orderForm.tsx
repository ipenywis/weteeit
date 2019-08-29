import React, { useState } from "react";
import styled from "styled-components";
import { BrandLogo } from "../../components/brandLogo";
import Input from "../../components/input";
import { HorizontalWrapper } from "../../components/horizontalWrapper";
import { Button } from "../../components/button";
import WilayaSelect from "./wilayaSelect";
import { IInputError, IWithRouterProps } from "../../typings/common";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  NAME_REGEX,
  FACEBOOK_REGEX
} from "../../../utils/patterns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";
import { ApolloClient, ApolloError } from "apollo-boost";
import { STORE_ORDER } from "./mutations";
import { IOrderProduct } from "../../typings/orderProduct";
import { IAppContextProps } from "../../app.context";
import { IStoredOrder } from "../../typings/order";
import messages from "./messages";
import { ErrorWrapper } from "../../components/error";
import { Divider } from "../../components/divider";
import { VerticalWrapper } from "../../components/verticalWrapper";
import { InputFields } from "./constants";
import { Popup } from "../../components/popup";
import { parseWilayaShipping } from "../../../utils/common";

export interface IOrderFormProps extends IWithRouterProps {
  client: ApolloClient<any>;
  cart: IAppContextProps["cart"];
  instructions: IAppContextProps["instructions"];
  setCart: IAppContextProps["setCart"];
  shippingPrice: number | null;
  setShippingPrice: (price: number | null) => void;
}

const OrderFormContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
  position: relative;
`;

const InnerContainer = styled.div`
  width: 75%;
  height: 100%;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.div`
  font-size: 37px;
  font-weight: 800;
  font-family: "Open-Sans", sans-serif;
  color: #3d3d3d;
  display: flex;
  margin-bottom: 2px;
`;

const InlineInputGroup = styled(HorizontalWrapper)`
  flex-direction: row;
`;

const InputContainer = styled.div`
  margin-bottom: 2em;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FooterContainer = styled(HorizontalWrapper)`
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  font-size: 30px;
  padding: 0.4em 3em;
  border-radius: 10px;
`;

const CancelOrder = styled.div`
  position: absolute;
  top: 1em;
  right: 2em;
  color: #3d3d3d;
  cursor: pointer;

  svg {
    transition: filter 200ms ease-in-out;
    &:hover {
      filter: contrast(0.3);
    }
  }
`;

const CenteredVerticalWrapper = styled(VerticalWrapper)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

function SuccessPopup() {
  return (
    <Popup isOpen={true} icon={faSmileBeam}>
      Your Order Has Been Placed, Your items are on the way
    </Popup>
  );
}

interface IOrderFormState {
  email: string;
  phone: string;
  facebook: string;
  firstName: string;
  lastName: string;
  address: string;
  wilaya: string;
  city: string;
  errors: IInputError;
  submitError: string | null;
  isSuccessPopupOpen: boolean;
}

class OrderForm extends React.Component<IOrderFormProps> {
  state: IOrderFormState;

  constructor(props: IOrderFormProps) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      facebook: "",
      firstName: "",
      lastName: "",
      address: "",
      wilaya: "",
      city: "",
      errors: {},
      submitError: null,
      isSuccessPopupOpen: false
    };
  }

  setFieldError(fieldName: string, err: string): boolean {
    this.setState((prevState: IOrderFormState) => {
      return {
        errors: { ...prevState.errors, [fieldName]: err }
      };
    });
    return true;
  }

  clearFieldErrorAndUpdate(fieldName: string, value: string) {
    this.setState((prevState: IOrderFormState) => ({
      [fieldName]: value,
      errors: { ...prevState.errors, [fieldName]: undefined }
    }));
  }

  clearAllFieldsErrors() {
    this.setState({ errors: {} });
  }

  onInputChange(fieldName: string, value: string) {
    this.clearFieldErrorAndUpdate(fieldName, value);
  }

  private validate(): boolean {
    const {
      email,
      phone,
      firstName,
      lastName,
      facebook,
      address,
      city,
      wilaya
    } = this.state;

    let isError = false;

    if (email.trim() === "") this.setFieldError("email", "Email is Required!");
    else if (!EMAIL_REGEX.test(email))
      isError = this.setFieldError(
        "email",
        "Please enter a valid email, ex: mail@example.com"
      );
    if (phone.trim() === "")
      isError = this.setFieldError("phone", "Phone number is Required!");
    else if (!PHONE_REGEX.test(phone))
      isError = this.setFieldError(
        "phone",
        "Please enter a Valid Phone Number"
      );
    if (firstName.trim() === "")
      isError = this.setFieldError("firstName", "First name is Required");
    else if (!NAME_REGEX.test(firstName))
      isError = this.setFieldError(
        "firstName",
        "First name must Container no spaces, numbers or special characters"
      );
    if (lastName.trim() === "")
      isError = this.setFieldError("lastName", "Last name is Required");
    else if (!NAME_REGEX.test(lastName))
      this.setFieldError(
        "lastName",
        "Last name must contain no spaces, numbers or special characters"
      );
    if (address.trim() === "")
      isError = this.setFieldError("address", "Shipping address is Required");
    if (city.trim() === "") this.setFieldError("city", "City is Required");
    else if (!NAME_REGEX.test(city))
      isError = this.setFieldError(
        "city",
        "City must Container no spaces, numbers or special characters"
      );
    if (wilaya.trim() === "")
      isError = this.setFieldError("wilaya", "Wilaya is Required");
    if (facebook.trim() !== "" && !FACEBOOK_REGEX.test(facebook))
      isError = this.setFieldError(
        "facebook",
        "Please enter a valid Facebook Profile"
      );

    return isError;
  }

  private serverSideValidation(error: ApolloError) {
    const errors = error.graphQLErrors;
    for (const err of errors) {
      if (
        typeof err.message === "object" &&
        typeof (err.message as any).message === "object"
      ) {
        const errMsg = err.message as any;
        if (errMsg.statusCode === 400 && errMsg.message[0]) {
          //Validation/BadRequest Error
          const message: any = errMsg.message[0];
          const property = message.property;
          const constraint: string = (Object.values(
            message.constraints
          ) as string[])[0];
          let fieldConstraint = constraint;
          //Replace constraint filed name with the proper name
          //(for more user friendly error messages)
          for (const fieldKey of Object.keys(InputFields)) {
            if (constraint.includes(fieldKey)) {
              fieldConstraint = fieldConstraint.replace(fieldKey, "Field ");
            }
          }
          //Set field validation error
          this.setFieldError(
            InputFields[property] || property,
            fieldConstraint
          );
        } else {
          //Other Exceptions
          //Set Submit error
          this.setSubmitError(errMsg.error);
        }
      }
    }
  }

  private setSubmitError(err: string) {
    this.setState({ submitError: err });
    return false;
  }

  private clearSubmitError() {
    this.setState({ submitErrorr: null });
    return true;
  }

  private openSuccessPopup(): Promise<boolean> {
    return new Promise((rs, rj) => {
      this.setState({ isSuccessPopupOpen: true });
      //Auto Hide after 4sec
      setTimeout(() => {
        this.setState({ isSuccessPopupOpen: false });
        rs(true);
      }, 4000);
    });
  }

  private clearForm() {
    //Clear All Inputs
    this.setState({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      facebook: "",
      address: "",
      wilaya: "",
      city: ""
    });
  }

  private emptyCart() {
    this.props.setCart(() => []);
  }

  private async submitOrder() {
    const {
      email,
      phone,
      firstName,
      lastName,
      facebook,
      address,
      city,
      wilaya
    } = this.state;

    const { cart, instructions } = this.props;

    const isValidationErr = this.validate();

    if (!isValidationErr) {
      //Check cart if is valid
      if (!cart || cart.length === 0)
        return this.setSubmitError(messages.errorCartIsEmpty);

      //Getting Cart Products
      const orderProducts: IOrderProduct[] = cart.map(item => ({
        name: item.name,
        quantity: item.quantity
      }));

      //GQ Mutation
      const res = await this.props.client
        .mutate<IStoredOrder>({
          mutation: STORE_ORDER,
          variables: {
            email,
            firstName,
            lastName,
            phone,
            facebook_profile: facebook === "" ? null : facebook,
            wilaya,
            city,
            address,
            instructions,
            products: orderProducts
          }
        })
        .catch((err: ApolloError) => {
          this.serverSideValidation(err);
        });
      //Check if order has been saved
      if (res && res.data) {
        await this.openSuccessPopup();
        this.clearForm();
        this.emptyCart();
        this.props.history.push("/shop");
      }
    }
  }

  cancelOrder() {
    //Go bak to cart (Push for not losing current state)
    this.props.history.push("cart");
  }

  render() {
    const {
      errors,
      email,
      phone,
      facebook,
      firstName,
      lastName,
      address,
      wilaya,
      city,
      submitError,
      isSuccessPopupOpen
    } = this.state;

    const isError = Object.values(errors).some(val => val !== undefined);

    const isSubmitting = false;

    return (
      <OrderFormContainer>
        <HorizontalWrapper width="100%">
          <BrandLogo color="black" size="xxl" />
          <CenteredVerticalWrapper></CenteredVerticalWrapper>
        </HorizontalWrapper>
        <InnerContainer>
          {submitError && <ErrorWrapper message={submitError} small />}
          {submitError && <Divider direction="horizontal" />}
          <InputContainer>
            <Title>Contact Information</Title>
            <Input
              placeholder="Email*"
              type="email"
              errors={errors}
              value={email}
              name="email"
              onChange={e => this.onInputChange("email", e.currentTarget.value)}
            />
            <InlineInputGroup>
              <Input
                placeholder="Phone*"
                type="text"
                name="phone"
                value={phone}
                errors={errors}
                onChange={e =>
                  this.onInputChange("phone", e.currentTarget.value)
                }
              />
              <Input
                placeholder="Facebook URL(optional)"
                type="text"
                name="facebook"
                value={facebook}
                errors={errors}
                onChange={e =>
                  this.onInputChange("facebook", e.currentTarget.value)
                }
              />
            </InlineInputGroup>
          </InputContainer>
          <InputContainer>
            <Title>Shipping Address</Title>
            <InlineInputGroup>
              <Input
                placeholder="First Name*"
                type="text"
                name="firstName"
                value={firstName}
                errors={errors}
                onChange={e =>
                  this.onInputChange("firstName", e.currentTarget.value)
                }
              />
              <Input
                placeholder="Last Name*"
                type="text"
                name="lastName"
                value={lastName}
                errors={errors}
                onChange={e =>
                  this.onInputChange("lastName", e.currentTarget.value)
                }
              />
            </InlineInputGroup>
            <Input
              placeholder="Address*"
              type="text"
              name="address"
              value={address}
              errors={errors}
              onChange={e =>
                this.onInputChange("address", e.currentTarget.value)
              }
            />
            <InlineInputGroup>
              <WilayaSelect
                wilaya={wilaya}
                shippingPrice={this.props.shippingPrice}
                error={errors.wilaya}
                onSelect={val => {
                  const [wilayaName, price] = parseWilayaShipping(val);
                  this.props.setShippingPrice(price);
                  this.onInputChange("wilaya", wilayaName);
                }}
              />
              <Input
                placeholder="City"
                type="text"
                name="city"
                value={city}
                errors={errors}
                onChange={e =>
                  this.onInputChange("city", e.currentTarget.value)
                }
              />
            </InlineInputGroup>
          </InputContainer>
          <FooterContainer>
            <SubmitButton
              onClick={this.submitOrder.bind(this)}
              disabled={isError || isSubmitting}
              large
            >
              SUBMIT
            </SubmitButton>
          </FooterContainer>
        </InnerContainer>
        <CancelOrder onClick={this.cancelOrder.bind(this)}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </CancelOrder>
        {isSuccessPopupOpen && <SuccessPopup />}
      </OrderFormContainer>
    );
  }
}

export default withRouter<IOrderFormProps>(OrderForm);
