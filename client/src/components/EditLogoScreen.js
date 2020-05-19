import React from 'react';
import EditImagePanel from './edit/EditImagePanel';
import EditTextPanel from './edit/EditTextPanel';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LogoDisplay from './edit/LogoDisplay';
import LogoObjectPanel from './edit/LogoObjectPanel';
import TextInputModal from './modals/TextInputModal';
import EditLogoPanel from './edit/EditLogoPanel';

const GET_LOGO = gql`
    query GetLogo($id: ID!) {
        logo(id: $id) {
          _id
            name
          backgroundColor
          borderColor
          borderRadius
          borderWidth
          padding
          margins
          width
          height
          texts {
            _id
            x
            y
            z
            type
            text
            color
            fontSize
          }
          images {
            _id
            x
            y
            z
            type
            url
            width
            height
          }
        }
      }`

// const UPDATE_IMAGE = gql`
// `
// const CREATE_NEW_IMAGE = gql`
//   mutation CreateImage($logoId: ID!, $url: String!, $z: Int!) {
//     addLogoImage(
//       url: $url,
//       x: 0,
//       y: 0,
//       z: $z,
//       width: 100,
//       height: 100,
//       logoId: $logoId,
//     ) {
//       _id
//     }
//   }`

// const CREATE_NEW_TEXT = gql`
//   mutation CreateText($logoId: ID!, $text: String!, $z: Int!) {
//     addLogoText(
//       x: 0,
//       y: 0,
//       z: $z,
//       text: $text,
//       color: "#000000",
//       fontSize: 24,
//       logoId: $logoId
//     ) {
//       _id
//     }
//   }`


const EditLogoScreen = (props) => {
  const { loading, error, data } = useQuery(GET_LOGO, { variables: { id: props.match.params.id } });
  // const [createNewImage] = useMutation(CREATE_NEW_IMAGE);
  // const [createNewText] = useMutation(CREATE_NEW_TEXT);
  const [logoData, setLogoData] = React.useState();

  const [selectedLogoObject, setSelectedLogoObject] = React.useState();
  const [textInputModalProps, setTextInputModalProps] = React.useState({
    show: false,
    closeCallback: () => {
      setTextInputModalProps(prevProps => {
        let updatedProps = {
          show: false
        }
        return { ...prevProps, ...updatedProps }
      });
    }
  });

  // const updateLogo = (newLogo) =>
  // {

  // }

  // const updateImage = (newImage) =>
  // {

  // }

  // const updateText = (newText) =>
  // {

  // }

  // const saveImage = (imageUrl, z, logoId) =>
  // {
  //   createNewImage({variables: {
  //     logoId: logoId,
  //     z: z,
  //     url: imageUrl,
  //   }}).then(image => {
  //     refetch();
  //   });
  // }

  // const saveText = (text, z, logoId) =>
  // {
  //   createNewText({variables: {
  //     logoId: logoId,
  //     z: z,
  //     text: text,
  //   }}).then(text => {
  //     refetch();
  //   });
  // }

  const initializeData = (data) => // adding index attribute to each image and text.
  {
    let textArray = data.texts;
    let imageArray = data.images;
    for (var i = 0; i < textArray.length; i++) {
      textArray[i]["idx"] = i;
    }
    for (var i = 0; i < imageArray.length; i++) {
      imageArray[i]["idx"] = i;
    }
    // console.log("Text Array", textArray);
    // console.log("Image Array", imageArray);
    return data;
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!logoData) {
    setLogoData(initializeData(data.logo));
  }

  console.log(logoData);

  const addText = () => {
    setTextInputModalProps(prevProps => {
      let updatedProps = {
        show: true,
        header: "Adding Text",
        inputLabel: "Text: ",
        placeholder: "Enter Text.",
        saveCallback: (text) => {
          let z = logoData.images.length + logoData.texts.length;
          let idx = logoData.texts.length;
          let newText = {
            x: 0,
            y: 0,
            z: z,
            idx: idx,
            text: text,
            type: "text",
            color: "#000000",
            fontSize: 24,
            logoId: logoData._id,
          }
          setLogoData(prevData => {
            prevData.texts.push(newText);
            return prevData;
          });
          //saveText(text, z, data.logo._id);
        }
      }
      return { ...prevProps, ...updatedProps }
    });
  }

  const addImage = () => {
    setTextInputModalProps(prevProps => {
      let updatedProps = {
        show: true,
        header: "Adding Image",
        inputLabel: "URL: ",
        placeholder: "Enter Image URL.",
        saveCallback: (url) => {
          let z = logoData.images.length + logoData.texts.length;
          let idx = logoData.images.length;
          let newImage = {
            x: 0,
            y: 0,
            z: z,
            type: "image",
            idx: idx,
            url: url,
            wdith: 100,
            height: 100,
            logoId: logoData._id,
          }
          setLogoData(prevData => {
            prevData.images.push(newImage);
            return prevData;
          });
          //let z = data.logo.images.length + data.logo.texts.length;
          //saveImage(url, z, data.logo._id);
        }
      }
      return { ...prevProps, ...updatedProps }
    });
  }

  //console.log(data);
  let displayEditLogo = false;
  let displayEditImage = false;
  let displayEditText = false;
  if (!selectedLogoObject) {
    displayEditLogo = true;
    displayEditImage = false;
    displayEditText = false;
  }
  else if (selectedLogoObject.type === "text") {
    displayEditLogo = false;
    displayEditImage = false;
    displayEditText = true;
  }
  else if (selectedLogoObject.type === "image") {
    displayEditLogo = false;
    displayEditImage = true;
    displayEditText = false;
  }

  //logoData is updated but not saved data.
  //data.logo is loaded data.
  let currentLogoData = logoData? logoData: data.logo;


  return (
    <div style={{ overflow: "hidden", height: "92vh" }}>
      Editing: {currentLogoData.name}
      <div className='row' style={{ height: "100%" }}>
        <div className='col-3'>
          <LogoObjectPanel
            logo={currentLogoData}
            selectedLogoObject={selectedLogoObject}
            selectLogoObjectCallback={(logoObj) => {
              setSelectedLogoObject(preObj => {
                if (!preObj)
                  return logoObj;
                if (logoObj._id === preObj._id)
                  return null;
                else return logoObj;
              });
            }}
            addTextCallback={addText}
            addImageCallback={addImage}
          />
          <TextInputModal {...textInputModalProps} />
        </div>
        <div className='col-6'>
          <LogoDisplay logo={currentLogoData} />
        </div>
        <div className='col-3'>
          {displayEditText ? <EditTextPanel logo={currentLogoData} /> : null}
          {displayEditImage ? <EditImagePanel logo={currentLogoData} /> : null}
          {displayEditLogo ? <EditLogoPanel logo={currentLogoData} /> : null}
        </div>
      </div>
    </div>
  )
}


export default EditLogoScreen