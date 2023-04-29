import axios from "axios";
import React, { useState } from "react";

function App(props) {

const data = props.data;

  const [metadata, setMetadata] = useState(props.metadata);

  const handleNameChange = (event) => {
    setMetadata({
      "721": {
        "2df82849a30577cbe3734f103d6d91f721c3508a45ca37955b768270": {
          [props.keyword]: {
            name: data?.displayname,
            image: `ipfs://${data.ipfshash}`,
            MintedFor: event.target.value,
            files: [{
                name: data.displayname,
                src: `ipfs://${data.ipfshash}`
            }],
          },
        },
      },
    });
    // setMetadata((prevState) => {
    //     return {
    //       "721": {
    //         ...prevState["721"],
    //         "2df82849a30577cbe3734f103d6d91f721c3508a45ca37955b768270": {
    //           ...prevState["721"]["2df82849a30577cbe3734f103d6d91f721c3508a45ca37955b768270"],
    //           "MintedFor": event.target.value
    //         }
    //       }
    //     };
    //   });
  };

  const updateMetadata = {policyid: data.policyid, uid: data.uid, metadata}
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const res = await axios.post(`http://localhost:3000/api/transactions/${data.uid}`, updateMetadata)
         console.log(res)
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className='updateform'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="metadata">Minted For:</label>
                <input 
                id="metadata" 
                name="MintedFor"
                type="text" 
                // value={metadata[721]["2df82849a30577cbe3734f103d6d91f721c3508a45ca37955b768270"][props.keyword]?.name}
                onChange={handleNameChange} 
                />
                <button type="submit">Update metadata</button>
            </form>
        </div>
  )

}

export default App;