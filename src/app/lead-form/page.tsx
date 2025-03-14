"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { BackButton, Checkbox, CheckboxGroup, ErrorText, FileInputContainer, FileLabel, FileName, Form, FormContainer, FormHeaderContainer, FormIconImgs, HiddenFileInput, Input, Label, Select, SubmitButton, SuccessMessage, TextArea, Title } from "./page.styled";
import { useReducer } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedIn: string;
  visas: string[];
  additionalInfo: string;
  resume: File | null;
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "TOGGLE_VISA"; visa: string }
  | { type: "SET_RESUME"; resume: File | null }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  linkedIn: "",
  visas: [],
  additionalInfo: "",
  resume: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_VISA":
      return {
        ...state,
        visas: state.visas.includes(action.visa)
          ? state.visas.filter((v) => v !== action.visa)
          : [...state.visas, action.visa],
      };
    case "SET_RESUME":
      return { ...state, resume: action.resume };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export default function LeadForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const visaOptions = useMemo(() => ["O-1", "EB-1A", "EB-2 NIW", "I don't know"], []);
  const countryOptions = useMemo(() => ["United States", "Canada", "United Kingdom", "India", "Germany", "Australia"], []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({ type: "SET_FIELD", field: e.target.name as keyof FormState, value: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleVisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch({ type: "TOGGLE_VISA", visa: e.target.value });
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!formState.firstName) newErrors.firstName = "First Name is required.";
    if (!formState.lastName) newErrors.lastName = "Last Name is required.";
    if (!formState.email) newErrors.email = "Email is required.";
    if (!formState.country) newErrors.country = "Country is required.";
    if (!formState.linkedIn) newErrors.linkedIn = "LinkedIn URL is required.";
    if (formState.visas.length === 0) newErrors.visas = "Select at least one visa category.";
    // if (!formState.resume) newErrors.resume = "Please upload your resume.";
    if (!formState.additionalInfo) newErrors.additionalInfo = "Please provide details about your immigration status.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, and DOCX files are allowed." }));
        return;
      }
      dispatch({ type: "SET_RESUME", resume: file });
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Submission failed");

      dispatch({ type: "RESET_FORM" });
      setSubmitted(true);
    } catch (error) {
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      {submitted ? (
        <SuccessMessage>
          <Image
            src="/images/icon1.png"
            alt="Form Banner"
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
          <h2>Thank you</h2>
          <p>Your information was submitted to our team of immigration attorneys.</p>
          <p>Expect an email from <strong>hello@tryalma.ai</strong></p>
          <BackButton onClick={() => setSubmitted(false)}>Go back to homepage</BackButton>
        </SuccessMessage>
      ) : (
        <>
          <Image
            src="/images/form-banner.png"
            alt="Form Banner"
            width={600}
            height={200}
            style={{ width: "100%", height: "auto" }}
          />
          <FormHeaderContainer>
            <FormIconImgs
              src="/images/icon1.png"
              alt="Form Banner"
              width={100}
            />
            <h1>
              Want to understand your visa options?
            </h1>
            <p>
              Submit the form below and our team of experienced attorneys will eview your information and send a preliminary assessment of your
              case based on your goals.
            </p>
          </FormHeaderContainer>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <Input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              {errors.firstName && <ErrorText aria-live="polite">{errors.firstName}</ErrorText>}

              <Input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
              {errors.lastName && <ErrorText aria-live="polite">{errors.lastName}</ErrorText>}

              <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              {errors.email && <ErrorText aria-live="polite">{errors.email}</ErrorText>}

              <Select name="country" onChange={handleChange} required>
                <option value="">Country of Citizenship</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
              {errors.country && <ErrorText aria-live="polite">{errors.country}</ErrorText>}

              <Input type="text" name="linkedIn" placeholder="LinkedIn Profile URL" onChange={handleChange} required />
              {errors.linkedIn && <ErrorText aria-live="polite">{errors.linkedIn}</ErrorText>}

              {/* Visa Checkboxes */}
              <FormIconImgs
                src="/images/diceIcon.png"
                alt="Form Banner"
                width={100}
              />
              <h1>Visa categories of interest?</h1>
              <CheckboxGroup>
                {visaOptions.map((visa) => (
                  <Label htmlFor={`visa-${visa}`} key={visa}>
                    <Checkbox id={`visa-${visa}`} type="checkbox" value={visa} onChange={handleVisaChange} />
                    {visa}
                  </Label>
                ))}
              </CheckboxGroup>
              {errors.visas && <ErrorText aria-live="polite">{errors.visas}</ErrorText>}

              <FileInputContainer>
                <HiddenFileInput id="resumeUpload" type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <FileLabel htmlFor="resumeUpload">Upload Resume</FileLabel>
                {formState.resume && <FileName>{formState.resume.name}</FileName>}
              </FileInputContainer>
              {errors.resume && <ErrorText aria-live="polite">{errors.resume}</ErrorText>}

              {/* Text Area */}
              <FormIconImgs
                src="/images/heart.png"
                alt="Form Banner"
                width={100}
              />
              <h1>How can we help you?</h1>
              <TextArea
                name="additionalInfo"
                placeholder="Provide additional information"
                rows={4}
                onChange={handleChange}
              />
              {errors.additionalInfo && <ErrorText aria-live="polite">{errors.additionalInfo}</ErrorText>}

              <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
}
