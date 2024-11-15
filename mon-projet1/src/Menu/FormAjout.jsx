import "./formajou.css";
import { useState } from "react";
import { MdClose } from "react-icons/md";
// import {MdModeEdit} from "react-icons/md"
// import {MdOutlineDeleteForever} from "react-icons/md"
import { MdAddCircleOutline } from "react-icons/md";
// import {MdSend} from "react-icons/md"

function FormAjout() {
  const [addSection, setAddSection] = useState(false);
  return (
    <>
      <div className="container">
        <button
          className="btns btn-adds no-print"
          onClick={() => setAddSection(true)}
        >
          Ajouter <MdAddCircleOutline />{" "}
        </button>

        {addSection && (
          <div className="addContainer">
            <form>
              <h2>Ajouter Activiter</h2>
              <div className="close-btn" onClick={() => setAddSection(false)}>
                <MdClose />
              </div>
              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Nom"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="inputPassword4">Type</label>
                  <input
                    type="Text"
                    class="form-control"
                    id="input"
                    placeholder="Type activité"
                  />
                </div>
              </div>
              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Nombre</label>
                  <input
                    type="number"
                    class="form-control"
                    id="input9"
                    placeholder="Nombre activité"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="inputPassword4">Lieu</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Lieu"
                  />
                </div>
              </div>

              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input9"
                    placeholder="Description"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="input">Service</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Service"
                  />
                </div>
              </div>
              
              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Date</label>
                  <input
                    type="Date"
                    class="form-control"
                    id="input9"
                    placeholder="Date"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="input">Image</label>
                  <input
                    type="file"
                    class="form-control"
                    id="input4"
                    placeholder="Image"
                  />
                </div>
              </div>

              <button className="btn" onClick={() => setAddSection(false)}>
                Ajouter
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default FormAjout;
