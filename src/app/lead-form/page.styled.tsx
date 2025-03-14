import styled from "styled-components";

export const FormHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  flex-direction: column;
  max-width: 700px;
  margin: 50px auto;
  text-align: center;
`;

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    text-align: center;
    padding: 10px;
  }
  p {
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const FormIconImgs = styled.img`
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 18px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  &::placeholder {
    color: #ccc;
  }
`;

export const Select = styled.select`
  padding: 18px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #ccc;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  color: #2c2c2c;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  background-color: white;

  &:checked {
    border: 2px solid #5487f5;
    background-color: #82a8f9;
  }
`;


export const TextArea = styled.textarea`
  padding: 18px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: -8px 0 10px;
`;

export const SubmitButton = styled.button`
  padding: 18px;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #333;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

export const BackButton = styled.button`
  margin-top: 15px;
  padding: 18px;
  background: #2c2c2c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #353535;
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  padding: 14px 18px;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #333;
  }
`;

export const FileName = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: #2c2c2c;
`;
