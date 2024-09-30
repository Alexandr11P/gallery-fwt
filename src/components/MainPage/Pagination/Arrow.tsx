function Arrow({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} width="8" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.68774 0.283494C7.51288 0.0697714 7.19787 0.0382703 6.98415 0.213134L0.384147 5.61313C0.268079 5.7081 0.200766 5.85015 0.200766 6.00011C0.200766 6.15008 0.268079 6.29213 0.384147 6.38709L6.98415 11.7871C7.19787 11.962 7.51288 11.9305 7.68774 11.7167C7.86261 11.503 7.83111 11.188 7.61739 11.0131L1.49036 6.00011L7.61739 0.987091C7.83111 0.812228 7.86261 0.497216 7.68774 0.283494Z"
      />
    </svg>
  );
}

export default Arrow;
