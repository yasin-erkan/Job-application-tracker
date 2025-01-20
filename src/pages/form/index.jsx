import Input from "./input";
import { statusOptions, typeOptions } from "../../utils/constants";
import "./form.scss";
import { useEffect, useState } from "react";
import api from "./../../utils/api";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getJob } from "../../utils/service";

const Form = () => {
  const [status, setStatus] = useState("Interview");
  const [editItem, setEditItem] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    if (!mode === "create") return setEditItem(null);
    getJob(mode).then((data) => setEditItem(data));
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    //send an api request
    api
      .post("/jobs", jobData)
      .then((res) => {
        //infrom Reducer for new application
        //guide users to the applications page and inform him
        dispatch(createJob(res.data));
        navigate("/");
        toast.success("Application created! ");
      })
      .catch((err) => {
        toast.error("Application built failed!");
      });
  };

  return (
    <div className="create-page">
      <section>
        <h2>Create a new application</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Position" name="position" />
          <Input label="Company" name="company" />
          <Input label="Location" name="location" />
          <Input
            label="Status"
            name="status"
            options={statusOptions}
            handleChange={(e) => setStatus(e.target.value)}
          />
          <Input label="Type" name="type" options={typeOptions} />
          <Input
            label={
              status === "Interview"
                ? "Interview Date"
                : status === "Rejected"
                ? "Rejection Date"
                : "Application Date"
            }
            name={
              status === "Interview"
                ? "interview_date"
                : status === "Rejected"
                ? "rejection_date"
                : "date"
            }
            type={status === "Interview" ? "datetime-local" : "date"}
          />
          <div className="btn-wrapper">
            <button>Create</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
