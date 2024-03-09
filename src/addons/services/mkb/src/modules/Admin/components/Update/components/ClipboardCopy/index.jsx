import { useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { ReactComponent as CopyIcon } from "./assets/copy-icon.svg";

export const ClipboardCopy = ({ copyText, cn }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cn}>
      <input type="text" className="hidden" value={copyText} readOnly />
      {/* Bind our handler function to the onClick button property */}
      {/* <button onClick={handleCopyClick}>
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </button> */}
      <Tooltip
        content="Скопировать значение ВОЗ"
        placement="right-start"
        className="bg-[#3256B0]"
      >
        <Button className="p-1 bg-[#3256B0]">
          <CopyIcon className="w-3 h-3 fill-white" onClick={handleCopyClick} />
        </Button>
      </Tooltip>
    </div>
  );
};
