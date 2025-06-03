function DefaultUserProfileLogo() {
  return (
    <svg
      width="110px"
      height="110px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <g
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <circle cx={16} cy={16} r={15} />
        <path d="M26 27h0c0-5.523-4.477-10-10-10h0c-5.523 0-10 4.477-10 10v0" />
        <circle cx={16} cy={11} r={6} />
      </g>
    </svg>
  )
}

export default DefaultUserProfileLogo
