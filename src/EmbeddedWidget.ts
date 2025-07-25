// Public facing config - what users will see
export interface EmbeddedWidgetConfig {
  token: string;
  onEvent?: (event: WidgetEvent) => void;
}

export interface WidgetEvent {
  type: string;
  data: any;
}

interface EmbeddedToken {
  token: string;
  widgetUrl: string;
}

// Airbyte logo SVG
const AIRBYTE_LOGO_SVG = `<svg width="184" height="28" viewBox="0 0 184 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_3119)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.43698 5.03318C11.0928 2.02838 15.491 1.1469 19.1068 2.88133C23.9105 5.186 25.6632 11.0569 23.0477 15.5855L17.1637 25.762C16.835 26.3305 16.294 26.7455 15.6595 26.9155C15.025 27.0855 14.349 26.9968 13.7798 26.669L20.9033 14.3462C22.8008 11.0594 21.5315 6.79905 18.0488 5.12163C15.4353 3.86308 12.2407 4.4918 10.3102 6.6562C9.24525 7.84443 8.6474 9.3785 8.62748 10.974C8.60753 12.5694 9.16675 14.118 10.2017 15.3325C10.3877 15.5503 10.5878 15.7558 10.8008 15.9475L6.64225 23.1543C6.47963 23.436 6.2631 23.6828 6.00503 23.881C5.74698 24.079 5.45243 24.2243 5.13823 24.3085C4.824 24.3928 4.4963 24.4143 4.17377 24.3718C3.85125 24.3293 3.54025 24.2238 3.2585 24.0613L7.77312 16.2373C7.12465 15.3023 6.65895 14.2531 6.4006 13.145L3.6341 17.949C3.30525 18.5178 2.76417 18.9325 2.1297 19.1025C1.4952 19.2728 0.81915 19.184 0.25 18.856L7.40417 6.46415C7.70195 5.95528 8.0478 5.47608 8.43698 5.03318ZM16.6942 8.97753C18.4172 9.9726 19.0123 12.1855 18.0153 13.9077L11.155 25.7605C10.8263 26.329 10.285 26.744 9.6505 26.914C9.016 27.084 8.34005 26.9953 7.7709 26.6675L14.141 15.6325C13.6298 15.525 13.1482 15.3078 12.7292 14.9958C12.3103 14.684 11.964 14.2849 11.7143 13.8261C11.4645 13.3674 11.3172 12.8599 11.2827 12.3388C11.2482 11.8176 11.3272 11.2951 11.5145 10.8075C11.7015 10.3198 11.9923 9.8786 12.3665 9.51425C12.7408 9.1499 13.1895 8.8711 13.682 8.6971C14.1745 8.52313 14.699 8.4581 15.219 8.5065C15.739 8.55493 16.2425 8.71563 16.6942 8.97753ZM14.199 11.2051C14.081 11.2956 13.982 11.4084 13.9077 11.5372C13.7957 11.7311 13.7435 11.9538 13.7582 12.1772C13.773 12.4006 13.8535 12.6146 13.9897 12.7922C14.1263 12.9698 14.312 13.103 14.524 13.175C14.736 13.2469 14.9647 13.2544 15.181 13.1964C15.3973 13.1385 15.5913 13.0177 15.739 12.8494C15.8865 12.681 15.981 12.4727 16.0103 12.2508C16.0393 12.0288 16.002 11.8032 15.903 11.6024C15.804 11.4016 15.6478 11.2347 15.4538 11.1227C15.3253 11.0484 15.183 11.0001 15.0357 10.9807C14.8882 10.9613 14.7385 10.9712 14.595 11.0097C14.4515 11.0482 14.3167 11.1145 14.199 11.2051Z" fill="#615EFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.75 21L33.8915 7.81641H36.9062L42.0477 21H39.1738L38.0665 18.047H32.7315L31.624 21H28.75ZM37.1875 15.6738C36.836 14.6425 36.5225 13.7197 36.247 12.9053C35.9718 12.0908 35.6905 11.25 35.4033 10.3828C35.1163 11.25 34.832 12.0908 34.5508 12.9053C34.2755 13.7197 33.962 14.6425 33.6102 15.6738H37.1875ZM42.918 9.22266C42.918 8.80078 43.047 8.46096 43.3047 8.20313C43.5625 7.94531 43.9022 7.81641 44.3242 7.81641C44.746 7.81641 45.086 7.94531 45.3438 8.20313C45.6015 8.46096 45.7305 8.80078 45.7305 9.22266C45.7305 9.64453 45.6015 9.98438 45.3438 10.2422C45.086 10.5 44.746 10.6289 44.3242 10.6289C43.9022 10.6289 43.5625 10.5 43.3047 10.2422C43.047 9.98438 42.918 9.64453 42.918 9.22266ZM43.0585 21V12.211H45.5897V21H43.0585ZM47.7345 12.211V21H50.2655V17.124C50.2655 16.1983 50.4737 15.4863 50.8897 14.9883C51.3057 14.4844 51.8535 14.2324 52.5332 14.2324C52.8612 14.2324 53.1952 14.2881 53.5352 14.3994L53.8867 12.211C53.4825 12.0938 53.0898 12.0352 52.709 12.0352C51.5898 12.0352 50.711 12.5127 50.0723 13.4678V12.211H47.7345ZM54.8535 21V7.81641H57.3848V13.0811C57.754 12.7529 58.1757 12.4981 58.6505 12.3164C59.125 12.1289 59.6377 12.0352 60.1885 12.0352C61.0147 12.0352 61.75 12.2344 62.3945 12.6328C63.039 13.0254 63.546 13.5674 63.915 14.2588C64.2843 14.9443 64.4688 15.7265 64.4688 16.6055C64.4688 17.4845 64.2843 18.2695 63.915 18.961C63.546 19.6465 63.039 20.1885 62.3945 20.587C61.75 20.9795 61.0147 21.1758 60.1885 21.1758C59.62 21.1758 59.0897 21.079 58.5977 20.8858C58.1055 20.6865 57.6747 20.4083 57.3057 20.0508L57.2442 21H54.8535ZM59.8672 18.9785C60.5117 18.9785 61.045 18.753 61.4668 18.3018C61.8888 17.8505 62.0995 17.2853 62.0995 16.6055C62.0995 15.9258 61.8888 15.3603 61.4668 14.9093C61.045 14.458 60.5117 14.2324 59.8672 14.2324C59.2227 14.2324 58.6895 14.458 58.2675 14.9093C57.8458 15.3603 57.6348 15.9258 57.6348 16.6055C57.6348 17.2853 57.8458 17.8505 58.2675 18.3018C58.6895 18.753 59.2227 18.9785 59.8672 18.9785ZM68.6982 16.5088L66.6415 12.211H63.996L68.0918 20.5605L66.088 25.3945H68.751L74.2178 12.211H71.546L69.1728 17.9415C69.1143 17.6543 69.044 17.3905 68.962 17.1505C68.88 16.9103 68.792 16.6963 68.6982 16.5088ZM74.5605 12.211H76.0107V10.0137H78.542V12.211H80.6777V14.4082H78.542V17.6425C78.542 18.0585 78.6738 18.3868 78.9375 18.627C79.207 18.8613 79.547 18.9785 79.957 18.9785C80.2617 18.9785 80.5752 18.9113 80.8975 18.7763V20.8505C80.3407 21.0675 79.793 21.1758 79.254 21.1758C78.211 21.1758 77.4082 20.8975 76.8457 20.3408C76.289 19.7783 76.0107 18.9755 76.0107 17.9325V14.4082H74.5605V12.211ZM85.4765 18.5478C85.0548 18.2433 84.7647 17.8478 84.6065 17.3613H91.462V16.5968C91.462 15.712 91.2627 14.9268 90.8643 14.2412C90.4658 13.5557 89.921 13.0166 89.2295 12.624C88.544 12.2315 87.7588 12.0352 86.874 12.0352C85.9835 12.0352 85.1865 12.2344 84.4835 12.6328C83.7862 13.0254 83.2353 13.5645 82.831 14.25C82.4268 14.9298 82.2245 15.706 82.2245 16.579C82.2245 17.4638 82.4355 18.255 82.8575 18.9523C83.2792 19.6435 83.8622 20.1885 84.6065 20.587C85.3505 20.9795 86.209 21.1758 87.1817 21.1758C87.791 21.1758 88.4268 21.0763 89.0888 20.877C89.7568 20.6778 90.4308 20.3115 91.1103 19.7783L89.581 17.9503C89.253 18.2608 88.8867 18.5155 88.4825 18.7148C88.084 18.9083 87.58 19.005 86.9707 19.005C86.4022 19.005 85.9043 18.8525 85.4765 18.5478ZM88.7067 15.5C88.5667 15.1888 88.366 14.9243 88.1045 14.707C87.7238 14.3906 87.2665 14.2324 86.7335 14.2324C86.1942 14.2324 85.7255 14.3936 85.3272 14.7158C85.06 14.9353 84.8552 15.1965 84.713 15.5H88.7067Z" fill="white"/>
</g>
<path d="M97.828 21V9.08H105.588V10.52H99.396V14.296H105.268V15.736H99.396V19.56H105.588V21H97.828ZM107.355 21V12.376H108.811V14.136L108.603 13.864C108.816 13.32 109.158 12.904 109.627 12.616C110.096 12.328 110.624 12.184 111.211 12.184C111.883 12.184 112.486 12.3707 113.019 12.744C113.563 13.1173 113.936 13.608 114.139 14.216L113.723 14.232C113.947 13.56 114.326 13.0533 114.859 12.712C115.392 12.36 115.984 12.184 116.635 12.184C117.232 12.184 117.771 12.3227 118.251 12.6C118.742 12.8773 119.131 13.2613 119.419 13.752C119.707 14.2427 119.851 14.7973 119.851 15.416V21H118.347V15.896C118.347 15.416 118.262 15.0107 118.091 14.68C117.92 14.3493 117.686 14.0933 117.387 13.912C117.099 13.72 116.758 13.624 116.363 13.624C115.979 13.624 115.632 13.72 115.323 13.912C115.024 14.0933 114.784 14.3547 114.603 14.696C114.432 15.0267 114.347 15.4267 114.347 15.896V21H112.843V15.896C112.843 15.416 112.758 15.0107 112.587 14.68C112.416 14.3493 112.182 14.0933 111.883 13.912C111.595 13.72 111.254 13.624 110.859 13.624C110.475 13.624 110.128 13.72 109.819 13.912C109.52 14.0933 109.28 14.3547 109.099 14.696C108.928 15.0267 108.843 15.4267 108.843 15.896V21H107.355ZM126.429 21.192C125.735 21.192 125.101 21.0373 124.525 20.728C123.959 20.4187 123.522 19.9813 123.213 19.416L123.421 19.16V21H121.965V8.888H123.453V14.232L123.229 13.864C123.549 13.352 123.986 12.9467 124.541 12.648C125.095 12.3387 125.73 12.184 126.445 12.184C127.255 12.184 127.981 12.3813 128.621 12.776C129.271 13.1707 129.783 13.7093 130.157 14.392C130.53 15.064 130.717 15.832 130.717 16.696C130.717 17.5387 130.53 18.3013 130.157 18.984C129.783 19.6667 129.271 20.2053 128.621 20.6C127.981 20.9947 127.25 21.192 126.429 21.192ZM126.317 19.752C126.861 19.752 127.346 19.6187 127.773 19.352C128.199 19.0853 128.53 18.7227 128.765 18.264C129.01 17.7947 129.133 17.272 129.133 16.696C129.133 16.0987 129.01 15.576 128.765 15.128C128.53 14.6693 128.199 14.3067 127.773 14.04C127.346 13.7627 126.861 13.624 126.317 13.624C125.773 13.624 125.282 13.7573 124.845 14.024C124.418 14.2907 124.077 14.6587 123.821 15.128C123.575 15.5867 123.453 16.1093 123.453 16.696C123.453 17.272 123.575 17.7947 123.821 18.264C124.077 18.7227 124.418 19.0853 124.845 19.352C125.282 19.6187 125.773 19.752 126.317 19.752ZM136.636 21.192C135.804 21.192 135.062 20.9947 134.412 20.6C133.761 20.2053 133.249 19.6667 132.876 18.984C132.502 18.2907 132.316 17.5173 132.316 16.664C132.316 15.8 132.497 15.032 132.86 14.36C133.233 13.688 133.734 13.16 134.364 12.776C135.004 12.3813 135.718 12.184 136.508 12.184C137.148 12.184 137.713 12.3013 138.204 12.536C138.705 12.76 139.126 13.0693 139.468 13.464C139.82 13.848 140.086 14.2907 140.268 14.792C140.46 15.2827 140.556 15.7947 140.556 16.328C140.556 16.4453 140.545 16.5787 140.524 16.728C140.513 16.8667 140.497 17 140.476 17.128H133.404V15.848H139.612L138.908 16.424C139.004 15.8693 138.95 15.3733 138.748 14.936C138.545 14.4987 138.246 14.152 137.852 13.896C137.457 13.64 137.009 13.512 136.508 13.512C136.006 13.512 135.548 13.64 135.132 13.896C134.716 14.152 134.39 14.52 134.156 15C133.932 15.4693 133.841 16.0293 133.884 16.68C133.841 17.3093 133.937 17.864 134.172 18.344C134.417 18.8133 134.758 19.1813 135.196 19.448C135.644 19.704 136.129 19.832 136.652 19.832C137.228 19.832 137.713 19.6987 138.108 19.432C138.502 19.1653 138.822 18.824 139.068 18.408L140.316 19.048C140.145 19.4427 139.878 19.8053 139.516 20.136C139.164 20.456 138.742 20.712 138.252 20.904C137.772 21.096 137.233 21.192 136.636 21.192ZM146.416 21.192C145.605 21.192 144.874 20.9947 144.224 20.6C143.584 20.2053 143.077 19.6667 142.704 18.984C142.33 18.3013 142.144 17.5387 142.144 16.696C142.144 15.832 142.33 15.064 142.704 14.392C143.077 13.7093 143.584 13.1707 144.224 12.776C144.874 12.3813 145.605 12.184 146.416 12.184C147.13 12.184 147.765 12.3387 148.32 12.648C148.874 12.9467 149.312 13.352 149.632 13.864L149.392 14.232V8.888H150.896V21H149.44V19.16L149.632 19.416C149.333 19.9813 148.896 20.4187 148.32 20.728C147.754 21.0373 147.12 21.192 146.416 21.192ZM146.544 19.752C147.088 19.752 147.573 19.6187 148 19.352C148.426 19.0853 148.762 18.7227 149.008 18.264C149.264 17.7947 149.392 17.272 149.392 16.696C149.392 16.1093 149.264 15.5867 149.008 15.128C148.762 14.6587 148.426 14.2907 148 14.024C147.573 13.7573 147.088 13.624 146.544 13.624C146.01 13.624 145.525 13.7627 145.088 14.04C144.661 14.3067 144.325 14.6693 144.08 15.128C143.834 15.576 143.712 16.0987 143.712 16.696C143.712 17.272 143.834 17.7947 144.08 18.264C144.325 18.7227 144.661 19.0853 145.088 19.352C145.514 19.6187 146 19.752 146.544 19.752ZM157.119 21.192C156.308 21.192 155.578 20.9947 154.927 20.6C154.287 20.2053 153.78 19.6667 153.407 18.984C153.034 18.3013 152.847 17.5387 152.847 16.696C152.847 15.832 153.034 15.064 153.407 14.392C153.78 13.7093 154.287 13.1707 154.927 12.776C155.578 12.3813 156.308 12.184 157.119 12.184C157.834 12.184 158.468 12.3387 159.023 12.648C159.578 12.9467 160.015 13.352 160.335 13.864L160.095 14.232V8.888H161.599V21H160.143V19.16L160.335 19.416C160.036 19.9813 159.599 20.4187 159.023 20.728C158.458 21.0373 157.823 21.192 157.119 21.192ZM157.247 19.752C157.791 19.752 158.276 19.6187 158.703 19.352C159.13 19.0853 159.466 18.7227 159.711 18.264C159.967 17.7947 160.095 17.272 160.095 16.696C160.095 16.1093 159.967 15.5867 159.711 15.128C159.466 14.6587 159.13 14.2907 158.703 14.024C158.276 13.7573 157.791 13.624 157.247 13.624C156.714 13.624 156.228 13.7627 155.791 14.04C155.364 14.3067 155.028 14.6693 154.783 15.128C154.538 15.576 154.415 16.0987 154.415 16.696C154.415 17.272 154.538 17.7947 154.783 18.264C155.028 18.7227 155.364 19.0853 155.791 19.352C156.218 19.6187 156.703 19.752 157.247 19.752ZM167.87 21.192C167.038 21.192 166.297 20.9947 165.646 20.6C164.995 20.2053 164.483 19.6667 164.11 18.984C163.737 18.2907 163.55 17.5173 163.55 16.664C163.55 15.8 163.731 15.032 164.094 14.36C164.467 13.688 164.969 13.16 165.598 12.776C166.238 12.3813 166.953 12.184 167.742 12.184C168.382 12.184 168.947 12.3013 169.438 12.536C169.939 12.76 170.361 13.0693 170.702 13.464C171.054 13.848 171.321 14.2907 171.502 14.792C171.694 15.2827 171.79 15.7947 171.79 16.328C171.79 16.4453 171.779 16.5787 171.758 16.728C171.747 16.8667 171.731 17 171.71 17.128H164.638V15.848H170.846L170.142 16.424C170.238 15.8693 170.185 15.3733 169.982 14.936C169.779 14.4987 169.481 14.152 169.086 13.896C168.691 13.64 168.243 13.512 167.742 13.512C167.241 13.512 166.782 13.64 166.366 13.896C165.95 14.152 165.625 14.52 165.39 15C165.166 15.4693 165.075 16.0293 165.118 16.68C165.075 17.3093 165.171 17.864 165.406 18.344C165.651 18.8133 165.993 19.1813 166.43 19.448C166.878 19.704 167.363 19.832 167.886 19.832C168.462 19.832 168.947 19.6987 169.342 19.432C169.737 19.1653 170.057 18.824 170.302 18.408L171.55 19.048C171.379 19.4427 171.113 19.8053 170.75 20.136C170.398 20.456 169.977 20.712 169.486 20.904C169.006 21.096 168.467 21.192 167.87 21.192ZM177.65 21.192C176.839 21.192 176.109 20.9947 175.458 20.6C174.818 20.2053 174.311 19.6667 173.938 18.984C173.565 18.3013 173.378 17.5387 173.378 16.696C173.378 15.832 173.565 15.064 173.938 14.392C174.311 13.7093 174.818 13.1707 175.458 12.776C176.109 12.3813 176.839 12.184 177.65 12.184C178.365 12.184 178.999 12.3387 179.554 12.648C180.109 12.9467 180.546 13.352 180.866 13.864L180.626 14.232V8.888H182.13V21H180.674V19.16L180.866 19.416C180.567 19.9813 180.13 20.4187 179.554 20.728C178.989 21.0373 178.354 21.192 177.65 21.192ZM177.778 19.752C178.322 19.752 178.807 19.6187 179.234 19.352C179.661 19.0853 179.997 18.7227 180.242 18.264C180.498 17.7947 180.626 17.272 180.626 16.696C180.626 16.1093 180.498 15.5867 180.242 15.128C179.997 14.6587 179.661 14.2907 179.234 14.024C178.807 13.7573 178.322 13.624 177.778 13.624C177.245 13.624 176.759 13.7627 176.322 14.04C175.895 14.3067 175.559 14.6693 175.314 15.128C175.069 15.576 174.946 16.0987 174.946 16.696C174.946 17.272 175.069 17.7947 175.314 18.264C175.559 18.7227 175.895 19.0853 176.322 19.352C176.749 19.6187 177.234 19.752 177.778 19.752Z" fill="white"/>
<defs>
<clipPath id="clip0_2_3119">
<rect width="91.5" height="25" fill="white" transform="translate(0 1.5)"/>
</clipPath>
</defs>
</svg>
`;

// URL encode the Airbyte logo for CSS
const encodedAirbyteLogo = encodeURIComponent(AIRBYTE_LOGO_SVG);

// CSS styles for the widget
const WIDGET_STYLES = `
.airbyte-widget-dialog-wrapper {
  padding: 0;
  border: none;
  background: transparent;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  margin: auto;
}

.airbyte-widget-dialog-container {
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
  
.airbyte-widget-dialog-content {
  width: 500px;
  height: 722px;
  border-radius: 10px;  
  background: none;
  overflow: hidden;
  max-width: 100vw;
  max-height: calc(100vh - 60px);
}

.airbyte-widget-dialog-branding {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml;charset=utf-8,${encodedAirbyteLogo}");
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-height: 782px) {
  .airbyte-widget-dialog-branding {
    display: none;
  }
  .airbyte-widget-dialog-content {
    max-height: 100vh;
  }
}

.airbyte-widget-dialog-wrapper::backdrop {
  background-color: hsl(241, 51%, 20%);
  opacity: 0.6;
}
`;

export class AirbyteEmbeddedWidget {
  private decodedToken: EmbeddedToken;
  private dialog: HTMLDialogElement = document.createElement("dialog");
  private iframe: HTMLIFrameElement = document.createElement("iframe");
  private onEvent?: (event: WidgetEvent) => void;

  constructor(config: EmbeddedWidgetConfig) {
    if (!config.token) {
      throw new Error("Token is required to initialize AirbyteEmbeddedWidget");
    }

    this.onEvent = config.onEvent;
    this.decodedToken = this.decodeToken(config.token);

    this.initialize();
  }

  private decodeToken(token: string): EmbeddedToken {
    try {
      // Decode base64
      // Make sure the base64 string is properly padded
      const padded = token.padEnd(token.length + ((4 - (token.length % 4)) % 4), "=");
      // Replace URL-safe characters
      const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

      let decoded;
      try {
        decoded = atob(base64);
      } catch (error) {
        console.debug("Error decoding base64 string:", error);
        throw new Error("Invalid token format: could not decode base64");
      }

      // Parse JSON
      const parsed = JSON.parse(decoded);
      if (!parsed.widgetUrl) {
        throw new Error("Invalid token: missing widgetUrl");
      }
      return parsed;
    } catch (error: any) {
      throw new Error(`Failed to decode token: ${error.message || "Unknown error"}`);
    }
  }

  private initialize(): void {
    this.setupStyles();
    this.createDialogStructure();
    this.setupIframe();

    // Add dialog to document
    document.body.appendChild(this.dialog);
  }

  private setupStyles(): void {
    // Add styles
    const style = document.createElement("style");
    style.textContent = WIDGET_STYLES;
    document.head.appendChild(style);
  }

  private createDialogStructure(): void {
    // Create dialog element
    this.dialog.setAttribute("aria-label", "Airbyte Widget");
    this.dialog.classList.add("airbyte-widget-dialog-wrapper");

    // Create container for content and branding
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("airbyte-widget-dialog-container");

    // Create content and branding elements
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("airbyte-widget-dialog-content");

    const dialogBranding = document.createElement("div");
    dialogBranding.classList.add("airbyte-widget-dialog-branding");

    // Assemble the dialog structure
    this.dialog.appendChild(dialogContainer);
    dialogContainer.appendChild(dialogContent);
    dialogContainer.appendChild(dialogBranding);
  }

  private setupIframe(): void {
    // Get the dialog content area
    const dialogContent = this.dialog.querySelector(".airbyte-widget-dialog-content");
    if (!dialogContent) return;

    // Create iframe only if we have a valid URL
    if (this.decodedToken.widgetUrl) {
      this.iframe.setAttribute("src", this.decodedToken.widgetUrl);
      this.iframe.setAttribute("frameborder", "0");
      this.iframe.setAttribute("allow", "fullscreen");
      this.iframe.style.width = "100%";
      this.iframe.style.height = "100%";
      this.iframe.style.border = "none";
      dialogContent.appendChild(this.iframe);

      // Listen for messages from the iframe
      try {
        // Add event listener using the bound handler method
        window.addEventListener("message", this.handleMessage);
      } catch (error) {
        console.debug("Error initializing widget. Please check your token configuration.");
      }
    } else {
      console.debug("Error: Missing widget URL. Please check your token configuration.");
    }
  }

  public updateToken(token: string): void {
    if (!token) {
      throw new Error("Token is required");
    }

    this.decodedToken = this.decodeToken(token);

    // Only proceed if we have a valid widget URL (should always be true after decodeToken validation)
    if (!this.decodedToken.widgetUrl) {
      console.warn("Cannot update token: Missing widget URL");
      return;
    }

    try {
      const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;
      const message = { scopedAuthToken: this.decodedToken.token };
      this.iframe.contentWindow?.postMessage(message, iframeOrigin);
    } catch (error) {
      console.debug("Error sending updated token to iframe:", error);
    }
  }

  public open(): void {
    this.dialog.showModal();
  }

  /**
   * Clean up resources used by the widget
   * Call this when the widget is no longer needed
   */
  public destroy(): void {
    // Remove the dialog from the DOM
    if (this.dialog.parentElement) {
      this.dialog.parentElement.removeChild(this.dialog);
    }

    // Remove event listeners
    window.removeEventListener("message", this.handleMessage);
  }

  // Bound message handler to allow for removal
  private handleMessage = (event: MessageEvent): void => {
    if (!this.decodedToken.widgetUrl) return;

    try {
      const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;

      // Skip if not from our iframe
      if (!this.isFromOurIframe(event, iframeOrigin)) {
        return;
      }

      this.processMessage(event, iframeOrigin);
    } catch (error) {
      console.error("Error handling message event:", error);
    }
  };

  // Check if the message is from our iframe
  private isFromOurIframe(event: MessageEvent, iframeOrigin: string): boolean {
    // Ensure the message is coming from the iframe we created
    const isFromIframe = event.origin === iframeOrigin || event.source === this.iframe.contentWindow;
    if (!isFromIframe) {
      return false;
    }

    // Skip if the message is from ourselves (localhost)
    if (event.origin === window.location.origin && event.source === window) {
      return false;
    }

    return true;
  }

  // Process the message content
  private processMessage(event: MessageEvent, iframeOrigin: string): void {
    // Handle auth token request
    if (event.data === "auth_token_request") {
      this.sendAuthToken(iframeOrigin);
      return;
    }

    // Handle close dialog message
    if (event.data && event.data === "CLOSE_DIALOG") {
      this.dialog.close();
      return;
    }

    // Handle custom events
    this.handleCustomEvent(event.data);
  }

  // Send auth token to iframe
  private sendAuthToken(iframeOrigin: string): void {
    const message = { scopedAuthToken: this.decodedToken.token };
    try {
      this.iframe.contentWindow?.postMessage(message, iframeOrigin);
    } catch (error) {
      console.debug("Error posting message to iframe:", error);
    }
  }

  // Handle custom event if it matches our expected format
  private handleCustomEvent(data: any): void {
    if (!this.onEvent || !data || typeof data !== "object" || !data.type) {
      return;
    }

    this.onEvent(data as WidgetEvent);
  }
}
