import React, { useState } from "react";

const SnippetDialog = () => {
  const [responseData, setresponseData] = useState([
    {
      heading: `Section 1.10.33 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC`,
      text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et`,
    },
    {
      heading: `Section 1.10.33 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC`,
      text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et`,
    },
    {
      heading: `Section 1.10.33 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC`,
      text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et`,
    },
    {
      heading: `Section 1.10.33 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC`,
      text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et`,
    },
  ]);
  return (
    <div className="flex flex-col gap-5 mx-6 my-5">
      {responseData.map((e, i) => (
        <div className="flex flex-row gap-3  ">
          <div className="flex flex-col rounded-[0.635rem] border-2 px-4 py-2  border-white bg-popup-gradient w-3/4 gap-1">
            <div className="font-sans text-[1.125rem] font-bold leading-[1.13625rem]">
            {e.heading}
            </div>
            <div className="font-sans text-[0.625rem]">
            {e.text}
            </div>
          </div>
          <div className="w-1/4 flex gap-4 flex-col text-[0.6875rem] font-sans ">
            <div className="flex h-1/2 gap-3">
              <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0   py-1 ">
                <a href="/snippets/summary">Summary</a>
              </button>
              <button className="rounded border-[1px] hover:bg-hover-gradient hover:text-black hover:border-0  w-1/2 py-1 ">
                <a href="/snippets/favour">In whose favour</a>
              </button>
            </div>
            <div className="flex h-1/2 text-[0.5625rem] -tracking-[0.01688rem]  gap-3">
              <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0  py-1 ">
                <a href="/snippets/neutral">How to make neutral</a>
              </button>
              <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0  py-1 ">
                <a href="/snippets/direction">Bend in Opp. Direction</a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetDialog;
