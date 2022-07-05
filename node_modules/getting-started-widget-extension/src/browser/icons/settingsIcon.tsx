import React from "react";

interface SettingsIconProps {
  width: string
  height: string
  color: string
}

function SettingsIcon(props: SettingsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="mask0"
        width="20"
        height="20"
        x="2"
        y="2"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill={props.color}
          fillRule="evenodd"
          d="M19.502 12c0 .34-.03.66-.07.98l2.11 1.65c.19.15.24.42.12.64l-2 3.46c-.12.22-.38.31-.61.22l-2.49-1c-.52.39-1.08.73-1.69.98l-.38 2.65c-.03.24-.24.42-.49.42h-4c-.25 0-.46-.18-.49-.42l-.38-2.65c-.61-.25-1.17-.58-1.69-.98l-2.49 1c-.22.08-.49 0-.61-.22l-2-3.46a.505.505 0 01.12-.64l2.11-1.65a7.93 7.93 0 01-.07-.98c0-.33.03-.66.07-.98l-2.11-1.65a.493.493 0 01-.12-.64l2-3.46c.12-.22.38-.31.61-.22l2.49 1c.52-.39 1.08-.73 1.69-.98l.38-2.65c.03-.24.24-.42.49-.42h4c.25 0 .46.18.49.42l.38 2.65c.61.25 1.17.58 1.69.98l2.49-1c.22-.08.49 0 .61.22l2 3.46c.12.22.07.49-.12.64l-2.11 1.65c.04.32.07.64.07.98zm-11 0c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5z"
          clipRule="evenodd"
        ></path>
      </mask>
      <g mask="url(#mask0)">
        <path fill={props.color} d="M0 0H24V24H0z"></path>
      </g>
    </svg>
  );
}

SettingsIcon.defaultProps = {
  width: "24",
  height: "24",
  color: "#F8FAFC"
}

export default SettingsIcon;
