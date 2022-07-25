// eslint-disable-next-line no-unused-vars
import react, { useRef, useEffect, useState } from "react";
import "./App.css";
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
        complete: () => {
          set_show(false);
        },
        acceptedFiles: ".pdf,.csv,.png",
        parallelUploads: 2,
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

        <form ref={ref} className="dropzone" id="my-form" action="/">
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
              {/* <svg
                t="1658589034506"
                viewBox="0 0 1024 1024"
                fill="#007acc"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2277"
                width="200"
                height="200"
              >
                <path
                  d="M796.2 466.4c0-2.4 0.4-4.8 0.4-7.2 0-130-103.6-235.2-231.4-235.2-92.2 0-171.4 54.8-208.6 134-16.2-8.2-34.4-13-53.6-13-59 0-108.2 43.8-117.6 101C114.6 470.4 64 538.2 64 618c0 100.4 80.2 182 179 182L448 800l0-160-96.4 0 160.4-167.4 160.4 167.2-96.4 0 0 160 220.6 0c90.4 0 163.4-75 163.4-166.8C960 541.2 886.6 466.6 796.2 466.4z"
                  p-id="2278"
                ></path>
              </svg> */}
              <div className="container">
                <svg
                  id="svgMain"
                  align="center"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.02 512"
                  width="130"
                  height="130"
                >
                  <path
                    d="M511.61,315.85l-.06-.26c-.13-.6-.28-1.2-.46-1.8,0-.16-.11-.32-.16-.47s-.17-.53-.27-.79l-64-170.67a21.33,21.33,0,0,0-20-13.84h-64a21.33,21.33,0,1,0,0,42.66H411.9l48,128H362.69A21.34,21.34,0,0,0,341.35,320v42.66H170.69V320a21.34,21.34,0,0,0-21.34-21.34H52.14l48-128h49.21a21.33,21.33,0,1,0,0-42.66h-64a21.32,21.32,0,0,0-20,13.84l-64,170.67c-.1.26-.18.52-.27.78l-.16.48c-.18.6-.33,1.2-.46,1.8l-.06.26A21.37,21.37,0,0,0,0,320.73v170A21.33,21.33,0,0,0,21.35,512H490.69A21.33,21.33,0,0,0,512,490.69v-170A21.37,21.37,0,0,0,511.61,315.85Zm-42.26,153.5H42.69v-128H128V384a21.33,21.33,0,0,0,21.33,21.33H362.68A21.33,21.33,0,0,0,384,384V341.35h85.33v128Z"
                    transform="translate(-0.01 -0.02)"
                    fill="#5579C9"
                  />
                  <path
                    d="M176.93,228.44l64,64h0a20.6,20.6,0,0,0,1.55,1.4c.24.2.5.38.76.57s.6.46.91.67.62.38.93.57.57.35.86.51.65.31,1,.46.61.3.92.43.64.24,1,.35.67.25,1,.36.64.16,1,.24.7.19,1.06.26.75.12,1.12.17.63.11.94.14a20.9,20.9,0,0,0,2.09.11h0c.7,0,1.39,0,2.08-.11.32,0,.63-.09.95-.14s.75-.09,1.12-.17.71-.17,1.06-.26.64-.15,1-.24.68-.24,1-.36.64-.22.95-.35.62-.28.93-.43.65-.29,1-.46.57-.34.86-.51.62-.36.93-.57.61-.44.91-.67.51-.37.76-.57a20.6,20.6,0,0,0,1.55-1.4h0l64-64a21.33,21.33,0,0,0-30.17-30.17l-27.58,27.58V21.35a21.33,21.33,0,0,0-42.66,0v204.5L207.1,198.27a21.33,21.33,0,0,0-30.17,30.17Z"
                    transform="translate(-0.01 -0.02)"
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
