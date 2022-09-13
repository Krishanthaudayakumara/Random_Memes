import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import {BsArrowClockwise, BsFillArrowDownCircleFill} from 'react-icons/bs'
import Alert from 'react-bootstrap/Alert';




export default function Meme(props) {


  // https://jsfiddle.net/1bjyvko0/1/
  const [imgScales, setImgScales] = React.useState({
    width: "",
    height: "",
  });
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    // console.log(url)
    // console.log(meme.image)
    setMeme((prevMeme) => ({
      ...prevMeme,
      image: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
    
  }

  // function fillNstroke(canvas, text, x, y) {
  //   context.font = `900 ${canvas.width / 10}px arial`;
  //   context.fillStyle = "white";
  //   context.lineWidth = canvas.width / 400;
  //   let context = canvas.getContext("2d");
  //   context.fillText(text, x, y);
  //   context.strokeText(text, x, y);
  // }
  function nextLine(test) {
    let ar = test.split(" ");

    let o = 0,
      count = 0,
      limit = 12;

    if (ar.length > 1) {
      ar.forEach((w) => {
        w.split("").forEach((e) => {
          o++;
        });
        if (o <= limit) {
          o++;
          count = o;
        }
      });
      o--;
    } else {
      o = test.length;
      count = o > limit ? limit : o;
    }
    let lineCount = o / count;
    //console.log("o is:"+o+"\ncount is:"+count+"\nline count is:"+lineCount);

    // console.log(test.substring(0,count)+"\n");
    //if(lineCount>1) console.log(test.substring(count));
    return { lineCount, count };
  }



  function draw() {
    let canvas = document.getElementById("idCanvas");
    let context = canvas.getContext("2d");

    let imageObj = new Image();
    imageObj.onload = function () {
      let canvasHeight = (canvas.width / this.width) * this.height;

      context.drawImage(this, 0, 0, canvas.width, canvasHeight);
      context.font = `900 ${canvas.width / 10}px arial`;
      context.fillStyle = "white";
      context.lineWidth = canvas.width / 400;

      context.textAlign = "center";

      console.log("draw!");

      //fillNstroke(canvas, meme.topText, canvas.width/10,canvasHeight*0.1)
      // context.fillText(meme.bottomText, canvas.width / 2, canvasHeight * 0.9);
      // context.strokeText(meme.bottomText, canvas.width / 2, canvasHeight * 0.9);

      let nxtTop = nextLine(meme.topText);
      if (nxtTop.lineCount <= 1) {
        context.fillText(meme.topText, canvas.width / 2, canvasHeight * 0.2);
        context.strokeText(meme.topText, canvas.width / 2, canvasHeight * 0.2);
      } else {
        context.fillText(
          meme.topText.substring(0, nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.2
        );
        context.strokeText(
          meme.topText.substring(0, nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.2
        );
        context.fillText(
          meme.topText.substring(nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.2 + canvas.width / 12
        );
        context.strokeText(
          meme.topText.substring(nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.2 + canvas.width / 12
        );
      }

      let nxtBottom = nextLine(meme.bottomText);
      if (nxtBottom.lineCount <= 1) {
        context.fillText(meme.bottomText, canvas.width / 2, canvasHeight * 0.9);
        context.strokeText(
          meme.bottomText,
          canvas.width / 2,
          canvasHeight * 0.9
        );
      } else {
        context.fillText(
          meme.bottomText.substring(0, nxtBottom.count),
          canvas.width / 2,
          canvasHeight * 0.95 - canvas.width / 12
        );
        context.strokeText(
          meme.bottomText.substring(0, nxtBottom.count),
          canvas.width / 2,
          canvasHeight * 0.95 - canvas.width / 12
        );
        context.fillText(
          meme.bottomText.substring(nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.95
        );
        context.strokeText(
          meme.bottomText.substring(nxtTop.count),
          canvas.width / 2,
          canvasHeight * 0.95
        );
      }

      var dataURL = canvas.toDataURL();
      //console.log(dataURL);
    };
    imageObj.setAttribute("crossOrigin", "anonymous");
    imageObj.src = meme.image;
  }


  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  React.useEffect(() => {
    // draw();
    const onPageLoad = () => {
      draw();
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [meme]);

  React.useEffect(() => {
    setScales()
    delay(800).then(() => draw())
    
  }, [meme.image]);

  function setScales() {
    const img = new Image();
    img.src = meme.image;
    img.onload = function () {
      setImgScales((prev) => ({
        width: this.width,
        height: this.height,
      }));
      console.log("set scale");
    };
  }

  //React.useEffect(setScales, [meme]);
  let downloadMeme = function () {
    var link = document.createElement("a");
    link.download = `${meme.topText + " " + meme.bottomText}.png`;
    link.href = document.getElementById("idCanvas").toDataURL();
    link.click();
  };

  const styles = {
    backgroundImage: `url(${meme.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: window.innerHeight / 3,
    height: window.innerHeight / 5,
    fontWeight: 'bolder',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
  };
  // console.log(imgScales);
  return (
    <div className="meme">

      
      <Container>
        <Row>
          <Col>
            <Button variant="success" type="submit" onClick={downloadMeme}>
              <BsFillArrowDownCircleFill />   Download Meme
            </Button>
            <p>Preview...</p>

            <canvas
              id="idCanvas"
              width={
                window.innerWidth > 600
                  ? (window.innerWidth / 5) * 2
                  : window.innerWidth * 0.9
              }
              height={
                window.innerWidth > 600
                  ? (((window.innerWidth / 5) * 2) / imgScales.width) *
                    imgScales.height
                  : ((window.innerWidth * 0.9) / imgScales.width) *
                    imgScales.height
              }
            ></canvas>
            {/* <img
              src={props.url}
              alt="meme"
              width={window.innerWidth > 600 ? "100%" : window.innerWidth * 0.9}
            /> */}
          </Col>
          <Col>
            <div>
              <Form.Label>Top Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Top Text"
                name="topText"
                id="topText"
                value={meme.topText}
                onChange={handleChange}
              />

              <Form.Label>Bottom Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bottom Text"
                name="bottomText"
                id="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
              />
              <div className="memeButton">
                <p> Meme Template:</p>

                {/* <img src={meme.image} width={window.innerHeight / 3} /> */}
                <Button
                  style={styles}
                  id="changeBtn"
                  onClick={getMemeImage}
                >
                  <div><BsArrowClockwise /></div>
                  Click Here to Change
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
