// <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
// <script src="./js/uploadWidget.js" type="text/javascript"></script>

// TODO: move this config value to proper area (Cards view?)
// var cloudinaryImageRoot = '//res.cloudinary.com/kkhunt/image/upload/'

// TODO: need to know which card to associate image with
// TODO: allow user to upload image if already uploaded one?
// TODO: do we need to show multiple images per card?
// TODO: needs some way of updating an existing card

var myWidget = cloudinary.createUploadWidget(
    {
        cloudName: "kkhunt",
        uploadPreset: "nhww67ae",
        sources: ["local", "facebook", "instagram", "camera", "url"],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#ffffff",
            sourceBg: "#f4f4f5",
            windowBorder: "#90a0b3",
            tabIcon: "#000000",
            inactiveTabIcon: "#555a5f",
            menuIcons: "#555a5f",
            link: "#0433ff",
            action: "#339933",
            inProgress: "#0433ff",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd",
          },
          fonts: { default: null, "sans-serif": { url: null, active: true } },
        },
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      //console.log(document.location.protocol + cloudinaryImageRoot + result.info.path)

      // TODO: associate with correct card record
      // TODO: lookup correct path to card API instead of hard coding
      fetch('http://localhost:3001/api/cards/1').then(response => response.json()).then(card => {
        console.log("Got card:");
        console.log(card);
        card.image_path = result.info.image_path;
        fetch('http://localhost:3001/api/cards/1', {
          headers: { },  // auth header here?
          method: 'POST',
          body: JSON.stringify(card)
        }).then(response => response.json()).then(updatedCard => {
          console.log("Updated card is:");
          console.log(updatedCard);
        });
      });

    }
  }
);



document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

// function showUploadWidget() {
//   cloudinary.openUploadWidget(
    
//     (err, info) => {
//       if (!err) {
//         console.log("Upload Widget event - ", info);
//       }
//     }
//   );
// }