import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewUser from "../../../components/forms/NewUser";
import { User } from "../../../types";
import { handleResponse } from "../../../utils/functions";
import Api from "../utils/api";
import { pageTitles } from "../utils/texts";

const NewUserForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const title = pageTitles.newUser;

  const handleSubmit = async (values: User, { setErrors }) => {
    setLoading(true);
    await handleResponse({
      endpoint: () => Api.createUser(values),
      onError: (error) => {
        setErrors({
          form: error
        });
      },
      onSuccess: () => {
        navigate(-1);
      }
    });
    setLoading(false);
  };

  return (
    <NewUser isLoading={loading} title={title} handleSubmit={handleSubmit} />
  );
};

export default NewUserForm;
