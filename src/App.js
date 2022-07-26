// eslint-disable-next-line no-unused-vars
import react, { useRef, useEffect, useState } from "react";
import "./App.css";
import $ from "jquery";
import Dropzone from "dropzone";

// Optionally, import the dropzone file to get default styling.
import "dropzone/dist/dropzone.css";

// https://codesandbox.io/s/react-dropzone-with-thumbnails-use-hooks-forked-h41fv0?file=/src/index.js

Dropzone.autoDiscover = false;
function App() {
  const ref = useRef(null);

  const renders = useRef(0);
  const [show, set_show] = useState(true);
  const [count, set_count] = useState(0);
  const [count1, set_count1] = useState(0);

  useEffect(() => {
    if (renders.current === 0) {
      renders.current++;
      new Dropzone(ref.current, {
        previewTemplate: document.querySelector("#previewtemplate").innerHTML,
        complete: (file, response) => {
          set_show(false);
          file.previewElement.classList.remove("dz-error");
          file.previewElement.classList.add("dz-success");
          file.previewElement.querySelector(".dz-progress").style.display =
            "none";
        },

        // success: (file, response) => {
        //   console.log("Success");
        //   console.log(response);
        //   file.previewElement.classList.remove("dz-error");
        //   file.previewElement.classList.add("dz-success");
        //   file.previewElement.querySelector(".dz-progress").style.display =
        //     "none";
        // },

        acceptedFiles: ".pdf,.csv,.png",
        parallelUploads: 5,
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 300,
        filesizeBase: 1000,

        // addRemoveLinks:true,
        thumbnail: function (file, dataUrl) {
          if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");

            var images = file.previewElement.querySelectorAll(
              "[data-dz-thumbnail]"
            );
            for (var i = 0; i < images.length; i++) {
              var thumbnailElement = images[i];
              thumbnailElement.alt = file.name;
              thumbnailElement.src = dataUrl;
              // set_show(true);
            }
            setTimeout(function () {
              file.previewElement.classList.add("dz-image-preview");
            }, 1);
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  //file type
  Dropzone.options.myAwesomeDropzone = {
    accept: function (file, done) {
      var thumbnail = $(".dropzone .dz-preview.dz-file-preview .dz-image:last");

      switch (file.type) {
        case "application/pdf":
          thumbnail.css("background", "url(image/pdf.png");
          break;
        case "text/csv":
          thumbnail.css("background", "url(image/csv.png");
          break;
      }
      done();
    },
  };

  return (
    <div className="App">
      {/* <h2>上傳檔案</h2>
      <h3>選擇風格:</h3>
      <div>
        <button
          className="btn btn-style"
          style={{
            background: count % 2 === 1 ? "#132646" : "white",
            color: count % 2 === 1 ? "white" : "#132646",
          }}
          onClick={() => set_count(count + 1)}
        >
          科技
        </button>
        <button
          className="btn btn-style"
          style={{
            background: count1 % 2 === 1 ? "#132646" : "white",
            color: count1 % 2 === 1 ? "white" : "#132646",
          }}
          onClick={() => set_count1(count1 + 1)}
        >
          教育
        </button>
      </div>

      <section>
        <h3>選擇風格:</h3>
        <div>
          <input className="content" type="text" />
          <input className="content" type="text" />
        </div>
      </section> */}

      <section className="formarea">
        <h3>上傳產品圖片(一張或多張):</h3>

        <form ref={ref} className="dropzone" id="myAwesomeDropzone" action="/">
          <div id="previewtemplate" style={{ display: "none" }}>
            <div className="dz-preview dz-file-preview">
              <div className="dz-image">
                <img data-dz-thumbnail="" />
              </div>
              <div className="dz-details">
                <div className="dz-filename">
                  <span data-dz-name=""></span>
                </div>
              </div>
              <div className="icon">
                <svg
                  t="1658629811338"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3837"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512.465455 0.116364C230.609455 0.116364 1.210182 229.492364 1.210182 511.371636S230.586182 1022.650182 512.465455 1022.650182s511.278545-229.376 511.278545-511.278546C1023.720727 229.492364 794.344727 0.116364 512.465455 0.116364z m286.091636 413.230545L466.013091 754.222545a42.519273 42.519273 0 0 1-30.254546 12.753455h-0.232727a42.589091 42.589091 0 0 1-30.114909-12.427636l-178.711273-178.827637a42.565818 42.565818 0 0 1 0-60.253091 42.565818 42.565818 0 0 1 60.253091 0l148.363637 148.247273 302.312727-310.062545a42.682182 42.682182 0 0 1 60.253091-0.698182 42.821818 42.821818 0 0 1 0.674909 60.392727z m0 0"
                    p-id="3838"
                    fill="green"
                  ></path>
                </svg>
              </div>
              <div className="dz-progress">
                <span className="dz-upload" data-dz-uploadprogress=""></span>
              </div>
              {/* <div className="dz-error-message">
                <span data-dz-errormessage=""></span>
              </div> */}

              <div className="dz-size">
                <span data-dz-size=""></span>
              </div>
              {/* <a>Cancel upload</a> */}
              <button
                class="dz-remove"
                href="javascript:undefined;"
                data-dz-remove=""
                className="btn btn_del"
              >
                删除
              </button>
            </div>
          </div>

          {!show ? (
            <></>
          ) : (
            <section className="upload dz-clickable">
              <div className="container">
                <svg
                  id="svgMain"
                  align="center"
                  xmlns="http://www.w3.org/2000/svg"
                  width="130"
                  height="130"
                  viewBox="0 0 58 54"
                >
                  <path
                    d="M36.29,12.12a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41l-8-8h0L29,2l-.71.71h0l-8,8a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0L28,5.83V33.41a1,1,0,0,0,2,0V5.83Z"
                    transform="translate(0 -2)"
                    fill="#153E9B"
                  />
                  <path
                    d="M58,32.68,57.53,32h0l-3.58-5.38L51.52,23h0l-4-6H36v2H46.47l8.67,13H39v7H19V32H2.86l8.67-13H22V17H10.47L.43,32h0L0,32.65v20A3.39,3.39,0,0,0,3.38,56H54.61A3.39,3.39,0,0,0,58,52.62V32.68Z"
                    transform="translate(0 -2)"
                    fill="#153E9B"
                  />
                </svg>
              </div>
              <br></br>
              <div>將檔案拖拽到此區域或選擇檔案</div>
              <div className="tip">支援檔案:pdf,png,csv</div>
            </section>
          )}
        </form>
        <div className="container">
          <button className="btn btn-gen">產生圖片</button>
        </div>
      </section>
    </div>
  );
}

export default App;
