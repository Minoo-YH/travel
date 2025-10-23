import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./ccontact.css"
import Nav from "@Nav";
import Ftr from "../Ftr/Ftr"
const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle");
  const [state, handleSubmit] = useForm("xrbzykle");


  useEffect(() => {
    if (state.succeeded) {
      setFormStatus("sent");
    } else if (state.submitting) {
      setFormStatus("sending");
    }
  }, [state.succeeded, state.submitting]); 

  const onSubmit = (event) => {
    event.preventDefault();  
    handleSubmit(event);
  };

  return (
    <div>
      <Nav />
      <div className="contact-container">
        <div className="contact-content">
          <h1 className="title">
            <span className="icon-envelope">ðŸ“§</span> Contact Us
          </h1>
          <small className="sub-title">
            We're here to help you with any inquiries!
          </small>

          <div className="contact-details">
            <div className="contact-content-flex">
              <div className="contact-form" style={{ width: "60%" }}>
                {formStatus === "idle" && (
                  <form onSubmit={onSubmit}>
                    <div className="flex">
                      <label htmlFor="email">Email Address:</label>
                      <input required type="email" name="email" id="email" />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>

                    <div className="flex" style={{ marginTop: "24px" }}>
                      <label htmlFor="message">Your message:</label>
                      <textarea required name="message" id="message"></textarea>
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />
                    </div>

                    <button className="submit" disabled={state.submitting}>
                      {formStatus === "sending" ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
                {formStatus === "sent" && (
                  <p>Thanks for reaching out! We'll get back to you soon.</p>
                )}
              </div>
            
            </div>
          </div>
        </div>
      
      </div>
      < Ftr />
    </div>
  );
};

export default Contact;



