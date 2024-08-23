import React, { useEffect, useState } from "react";
import { getSummary } from "../../actions/Summary";
import { useSelector } from "react-redux";

import loaderGif from "../../assets/icons/2.gif";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { trimQuotes } from "../../utils/utils";

const SummaryDisplay = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const doc_id = useSelector((state) => state.document.docId);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await getSummary(doc_id);
      let temp = String.raw`${res.data.data.fetchedData.summary}`;

// Replace \n with line breaks, \t with tabs, and \" with "


console.log(temp);  // Check the processed text
   // Update state with processed text
 // Check the processed text
      // Update state with processed text

      setText(trimQuotes(temp));
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [doc_id]);

  return (
    <div className="bg-card-gradient bg-cover rounded-md border border-white flex flex-col items-center justify-center h-full w-full p-2">
      <div className="flex flex-col w-full justify-start items-start h-[80vh] gap-3 p-2 ">
        <div className="flex flex-row pt-3">
          <p className="text-3xl font-semibold text-teal-500">Adira AI</p>
          <sup>by Claw</sup>
        </div>
        {loading ? (
          <div className="flex flex-col h-full items-center justify-center w-full">
            <img
              className="flex flex-row justify-center items-center w-40 h-40"
              src={loaderGif}
              alt="Loading..."
            />
          </div>
        ) : (
          <div
            id="summary-text"
            className="h-full overflow-y-auto scrollbar-hide p-2"
          >
             <Markdown
                  children={text
                    .replace(/\\n/g, "\n")
                    .replace(/\\t/g, "\t")
                    .replace(/\\"/g, '"')}
                  components={{
                    p(props) {
                      const { children } = props;
                      return (
                        <p className="text-balance py-1 text-base text-primary-theme-white-50">
                          {children}
                        </p>
                      );
                    },

                    h1(props) {
                      const { children } = props;
                      return (
                        <h1 className="pb-6 pt-12 text-4xl font-bold text-primary-theme-white-50">
                          {children}
                        </h1>
                      );
                    },

                    h3(props) {
                      const { children } = props;
                      return (
                        <h3 className="py-3 text-xl font-bold text-primary-theme-white-50">
                          {children}
                        </h3>
                      );
                    },

                    h4(props) {
                      const { children } = props;
                      return (
                        <h4 className="py-3 text-lg font-bold text-primary-theme-white-50">
                          {children}
                        </h4>
                      );
                    },

                    ul(props) {
                      const { children } = props;
                      return <ul className="">{children}</ul>;
                    },

                    a(props) {
                      const { href } = props;
                      return (
                        <a
                          className="text-wrap text-primary-theme-cyan-200/90 underline hover:text-primary-theme-cyan-200"
                          href={href}
                        >
                          {href}
                        </a>
                      );
                    },

                    li(props) {
                      const { children } = props;
                      return (
                        <li className="py-1 text-base text-primary-theme-white-50">
                          {children}
                        </li>
                      );
                    },

                    hr() {
                      return (
                        <div className="h-0 border-t border-primary-theme-white-50 py-2" />
                      );
                    },

                    img(props) {
                      const { alt, src } = props;
                      return (
                        <img
                          loading="lazy"
                          alt={alt || "Image"}
                          className="my-6 rounded-lg"
                        />
                      );
                    },

                    code(props) {
                      const { children } = props;
                      return (
                        <div className="mx-2 my-6 overflow-auto rounded-md border border-primary-theme-white-50/10 p-2 text-primary-theme-white-200">
                          <code>{children}</code>
                        </div>
                      );
                    },
                  }}
                />
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;
