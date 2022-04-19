import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import './FormPlaylist.css';

function FormPlaylist() {

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm();

  return (
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow round pb-3">
          <h1 className="text-center pt-3 text-secondary">Create Playlist</h1>
          <form >
            <div className="form-group">
              <label className="col-form-label">Title:</label>
              <input
                type="text"
                className={`form-control ${errors.title && "invalid"}`}
                {...register("title", {
                  required: "Title is Required",
                  minLength: {
                    value: 10,
                    message: "Minimum Required length is 10"
                  }
                })}

                onKeyUp={() => {
                  trigger("title");
                }}
              />
              {errors.title && (
                <small className="text-danger">{errors.title.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Desciption:</label>
              <textarea
                className={`form-control ${errors.description && "invalid"}`}
                {...register("description", {
                  required: "Description is Required"
                })}
                onKeyUp={() => {
                  trigger("description");
                }}
              />
              {errors.description && (
                <small className="text-danger">{errors.description.message}</small>
              )}
            </div>
            <Button className="btnSearch" as="input" type="submit" value="Submit" />{' '}
          </form>
        </div>
      </div>
    </div>
  );

}

export default FormPlaylist