import React from 'react';
import EditImagePanel from './edit/EditImagePanel';
import EditTextPanel from './edit/EditTextPanel';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LogoDisplay from './edit/LogoDisplay';
import LogoObjectPanel from './edit/LogoObjectPanel';
import TextInputModal from './modals/TextInputModal';
import EditLogoPanel from './edit/EditLogoPanel';
import Button from 'react-bootstrap/Button';
import { Promise } from 'bluebird';

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

const UPDATE_LOGO = gql`
  mutation UpdateLogo($id: ID!, $name: String!, $backgroundColor: String!, $borderColor: String!, $borderRadius: Int!, $borderWidth: Int!, 
    $padding: Int!, $margins: Int!, $width: Int!, $height: Int!) {
      updateLogo(id: $id, name: $name, backgroundColor: $backgroundColor, borderColor: $borderColor, borderRadius: $borderRadius, borderWidth: $borderWidth,
        padding: $padding, margins: $margins, width: $width, height: $height) {
        _id
      }
  }`

const CREATE_NEW_IMAGE = gql`
  mutation CreateImage($logoId: ID!, $url: String!, $x: Int!, $y: Int!, $z: Int!, $width: Int!, $height: Int!) {
    addLogoImage(
      url: $url,
      x: $x,
      y: $y,
      z: $z,
      width: $width,
      height: $height,
      logoId: $logoId,
    ) {
      _id
    }
  }`

const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: ID!, $url: String!, $x: Int!, $y: Int!, $z: Int!, $width: Int!, $height: Int!, $logoId: ID!) {
    updateLogoImage(id: $id, url: $url, x: $x, y: $y, z: $z, width: $width, height: $height, logoId: $logoId) {
      _id
    }
  }`

const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    deleteLogoImage(id: $id) {
      _id
    }
  }`

const CREATE_NEW_TEXT = gql`
  mutation CreateText($logoId: ID!, $text: String!, $x: Int!, $y: Int!, $z: Int!, $color: String!, $fontSize: Int!) {
    addLogoText(
      x: $x,
      y: $y,
      z: $z,
      text: $text,
      color: $color,
      fontSize: $fontSize,
      logoId: $logoId
    ) {
      _id
    }
  }`

const UPDATE_TEXT = gql`
  mutation UpdateText($id: ID!, $x: Int!, $y: Int!, $z: Int!, $text: String!, $color: String!, $fontSize: Int!, $logoId: ID!) {
    updateLogoText(id: $id, x: $x, y: $y, z: $z, text: $text, color: $color, fontSize: $fontSize, logoId: $logoId) {
      _id
    }
  }`

const DELETE_TEXT = gql`
  mutation DeleteText($id: ID!) {
    deleteLogoText(id: $id) {
      _id
    }
  }`

const EditLogoScreen = (props) => {
  const { loading, error, data, refetch } = useQuery(GET_LOGO, { variables: { id: props.match.params.id } });
  const [createNewImageDB] = useMutation(CREATE_NEW_IMAGE);
  const [createNewTextDB] = useMutation(CREATE_NEW_TEXT);
  const [updateImageDB] = useMutation(UPDATE_IMAGE);
  const [updateTextDB] = useMutation(UPDATE_TEXT);
  const [deleteImageDB] = useMutation(DELETE_IMAGE);
  const [deleteTextDB] = useMutation(DELETE_TEXT);
  const [updateLogoDB] = useMutation(UPDATE_LOGO);
  const [logoData, setLogoData] = React.useState();
  const [force, setForce] = React.useState(false);

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

  if (force) {
    //Eh what?
  }
  const saveLogo = (logo) => {
    console.log("Saving Logo", logo);
    setLogoData(null);
    setForce(preForce => {return !preForce});
    let logoObjs = logo.images.concat(logo.texts);
    //update main logo
    updateLogoDB({
      variables: {
        id: logo._id,
        name: logo.name,
        backgroundColor: logo.backgroundColor,
        borderColor: logo.borderColor,
        borderRadius: parseInt(logo.borderRadius),
        borderWidth: parseInt(logo.borderWidth),
        padding: parseInt(logo.padding),
        margins: parseInt(logo.margins),
        width: parseInt(logo.width),
        height: parseInt(logo.height),
      }
    })
    .then(() => {
      return Promise.all(logoObjs.map(logoObj => {
        //update logoObj
        //Add logoObj if it is new and not deleted.
        //Update logoObj if its not new and not deleted.
        //Delete logoObj if its not new and deleted.
        let isNew = (!logoObj._id);
        let deleted = logoObj.deleted;
        let type = logoObj.type;
        if (isNew) {
          if (!deleted) {
            if (type === "image") {
              return createNewImageDB({
                variables: {
                  logoId: logo._id,
                  url: logoObj.url,
                  x: parseInt(logoObj.x),
                  y: parseInt(logoObj.y),
                  z: parseInt(logoObj.z),
                  width: parseInt(logoObj.width),
                  height: parseInt(logoObj.height),
                }
              });
            }
            else {
              return createNewTextDB({
                variables: {
                  logoId: logo._id,
                  text: logoObj.text,
                  x: parseInt(logoObj.x),
                  y: parseInt(logoObj.y),
                  z: parseInt(logoObj.z),
                  color: logoObj.color,
                  fontSize: parseInt(logoObj.fontSize),
                }
              });
            }
          }
        }
        else {
          if (!deleted) {
            if (type === "image") {
              return updateImageDB({
                variables: {
                  id: logoObj._id,
                  url: logoObj.url,
                  x: parseInt(logoObj.x),
                  y: parseInt(logoObj.y),
                  z: parseInt(logoObj.z),
                  width: parseInt(logoObj.width),
                  height: parseInt(logoObj.height),
                  logoId: logo._id,
                }
              });
            }
            else {
              return updateTextDB({
                variables: {
                  id: logoObj._id,
                  x: parseInt(logoObj.x),
                  y: parseInt(logoObj.y),
                  z: parseInt(logoObj.z),
                  text: logoObj.text,
                  color: logoObj.color,
                  fontSize: parseInt(logoObj.fontSize),
                  logoId: logo._id,
                }
              })
            }
          }
          else {
            if (type === "image") {
              return deleteImageDB({
                variables: {
                  id: logoObj._id
                }
              });
            }
            else {
              return deleteTextDB({ variables: { id: logoObj._id } })
            }
          }
        }
        return null;
      }));
    }).finally(() => {
      refetch().then(() => {
        setLogoData(null);
        setForce(preForce => {return !preForce});
      });
    });
  }

  const initializeData = (dataObj) => // adding index attribute to each image and text.
  {
    let data = Object.assign({}, dataObj);
    let textArray = data.texts;
    let imageArray = data.images;
    for (let i = 0; i < textArray.length; i++) {
      textArray[i]["idx"] = i;
    }
    for (let i = 0; i < imageArray.length; i++) {
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

  //console.log(logoData);

  const addText = () => {
    setTextInputModalProps(prevProps => {
      let updatedProps = {
        show: true,
        header: "Adding Text",
        inputLabel: "Text: ",
        placeholder: "Enter Text.",
        saveCallback: (text) => {
          let allLogoObjs = logoData.texts.concat(logoData.images);
          allLogoObjs = allLogoObjs.filter(logoObjs => {
            return !logoObjs.deleted;
          });
          let z = allLogoObjs.length;
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
          let allLogoObjs = logoData.texts.concat(logoData.images);
          allLogoObjs = allLogoObjs.filter(logoObjs => {
            return !logoObjs.deleted;
          });
          let z = allLogoObjs.length;
          let idx = logoData.images.length;
          let newImage = {
            x: 0,
            y: 0,
            z: z,
            type: "image",
            idx: idx,
            url: url,
            width: 100,
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

  const canIncreaseZIndex = (logoObj) => {
    if (!logoObj)
      return false;
    let allLogoObjs = logoData.texts.concat(logoData.images);
    allLogoObjs = allLogoObjs.filter(logoObjs => {
      return !logoObjs.deleted;
    });
    let totalObjs = allLogoObjs.length;
    return (logoObj.z < totalObjs - 1);
  }

  const canDecreaseZIndex = (logoObj) => {
    if (!logoObj)
      return false;

    return logoObj.z > 0;
  }

  const increaseZIndex = (logoObj) => {
    if (canIncreaseZIndex(logoObj)) {
      let currentZ = logoObj.z;
      let currentIdx = logoObj.idx;
      let allLogoObjs = logoData.texts.concat(logoData.images);
      allLogoObjs = allLogoObjs.filter(logoObjs => {
        return !logoObjs.deleted;
      });
      let otherObj = allLogoObjs.find(obj => {
        return obj.z === currentZ + 1;
      });
      let otherIdx = otherObj.idx;
      setLogoData(prevData => {
        if (logoObj.type === "text") {
          prevData.texts[currentIdx].z = currentZ + 1;
          setSelectedLogoObject(preObj => { return prevData.texts[currentIdx] });
        }
        else {
          prevData.images[currentIdx].z = currentZ + 1;
          setSelectedLogoObject(preObj => { return prevData.images[currentIdx] });
        }
        if (otherObj.type === "text")
          prevData.texts[otherIdx].z = currentZ;
        else
          prevData.images[otherIdx].z = currentZ;
        return prevData;
      });
    }
    setForce(preForce => {
      return !preForce;
    });
    //search for logoObj.
  }

  const decreaseZIndex = (logoObj) => {
    if (canDecreaseZIndex(logoObj)) {
      let currentZ = logoObj.z;
      let currentIdx = logoObj.idx;
      let allLogoObjs = logoData.texts.concat(logoData.images);
      allLogoObjs = allLogoObjs.filter(logoObjs => {
        return !logoObjs.deleted;
      });
      let otherObj = allLogoObjs.find(obj => {
        return obj.z === currentZ - 1;
      });
      let otherIdx = otherObj.idx;
      setLogoData(prevData => {
        if (logoObj.type === "text") {
          prevData.texts[currentIdx].z = currentZ - 1;
          setSelectedLogoObject(preObj => { return prevData.texts[currentIdx] });
        }
        else {
          prevData.images[currentIdx].z = currentZ - 1;
          setSelectedLogoObject(preObj => { return prevData.images[currentIdx] });
        }
        if (otherObj.type === "text")
          prevData.texts[otherIdx].z = currentZ;
        else
          prevData.images[otherIdx].z = currentZ;


        return prevData;
      });
      setForce(preForce => {
        return !preForce;
      });
    }
  }

  const deleteLogoObject = (logoObj) => {
    //console.log("Deleting obj", logoObj);
    let allLogoObjs = logoData.texts.concat(logoData.images);
    allLogoObjs = allLogoObjs.filter(logoObjs => {
      return !logoObjs.deleted;
    });
    allLogoObjs.sort((logoObj1, logoObj2) => {
      return logoObj1.z - logoObj2.z;
    });
    setLogoData(prevData => {
      for (let i = logoObj.z + 1; i < allLogoObjs.length; i++) {
        if (allLogoObjs[i].type === "text")
          prevData.texts[allLogoObjs[i].idx].z = i - 1;
        else
          prevData.images[allLogoObjs[i].idx].z = i - 1;
      }
      if (logoObj.type === "text")
        prevData.texts[logoObj.idx].deleted = true;
      else
        prevData.images[logoObj.idx].deleted = true;
      return prevData;
    });
    setSelectedLogoObject(null);
  }

  const changeLogoObject = (newLogoObj) => {
    //console.log("Updating obj", newLogoObj);
    setLogoData(prevData => {
      if (newLogoObj.type === "text") {
        prevData.texts[newLogoObj.idx] = newLogoObj;
      }
      else {
        prevData.images[newLogoObj.idx] = newLogoObj;
      }
      return prevData;
    });
    setForce(preForce => {
      return !preForce;
    });
  }

  const changeLogo = (newLogo) => {
    setLogoData(newLogo);
    setForce(preForce => {
      return !preForce;
    });
  }

  const getLogoObjectId = (logoObj) => {
    let uniqueKey;
    if (logoObj.type === "text")
      uniqueKey = logoObj.idx;
    else
      uniqueKey = logoData.texts.length + logoObj.idx;
    return uniqueKey;
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

  //increaseZIndex();
  //logoData is updated but not saved data.
  //data.logo is loaded data.
  let currentLogoData = logoData ? logoData : data.logo;

  console.log("Logo Data", logoData);
  console.log("Online Data", data.logo);

  return (
    <div style={{ overflow: "hidden", height: "92vh" }}>
      Editing: {currentLogoData.name}
      <div className='row' style={{ height: "100%" }}>
        <div className='col-3'>
          <LogoObjectPanel
            //logo={currentLogoData}
            texts={currentLogoData.texts}
            images={currentLogoData.images}
            selectedLogoObject={selectedLogoObject}
            //canMoveDownCallback = {}
            moveUpOnclickCallback={increaseZIndex}
            moveDownOnclickCallback={decreaseZIndex}
            selectLogoObjectCallback={(logoObj) => {
              setSelectedLogoObject(preObj => {
                if (!preObj)
                  return logoObj;
                if (getLogoObjectId(logoObj) === getLogoObjectId(preObj))
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
        <div className='col-3' style={{ zIndex: "1000" }}>
          {displayEditText ? <EditTextPanel
            deleteCallback={deleteLogoObject}
            textObj={selectedLogoObject}
            changeTextCallBack={changeLogoObject}
          /> : null}
          {displayEditImage ? <EditImagePanel
            deleteCallback={deleteLogoObject}
            imgObj={selectedLogoObject}
            changeObjHeightCallback={changeLogoObject}
            changeObjWidthCallback={changeLogoObject}
          /> : null}
          {displayEditLogo ? <EditLogoPanel
            logo={currentLogoData}
            changeLogoCallback={changeLogo}
          /> : null}
          <Button variant="success" onClick={() => saveLogo(logoData)}>
            Save Logo
          </Button>
        </div>
      </div>
    </div>
  )
}


export default EditLogoScreen