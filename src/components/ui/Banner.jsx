import React, { useState } from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const [svgHover1, setSvgHover1] = useState(false);
  const [svgHover2, setSvgHover2] = useState(false);
  const [svgHover3, setSvgHover3] = useState(false);
  return (
    <div className="flex flex-row font-sans  w-[80%] m-auto    justify-between">
      <motion.div
        onHoverStart={() => setSvgHover1(true)}
        onHoverEnd={() => setSvgHover1(false)}
        className="flex items-center justify-center    flex-col gap-3"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 28 28"
          // stroke={svgHover1 ? "#00FDFF" : "white"}
        >
          <path
            d="M14.0108 2.37097e-05C13.9952 -0.000133305 13.9797 0.000489623 13.9642 0.00188998C13.8975 0.00684133 13.8326 0.0260671 13.774 0.058265C13.7154 0.0904629 13.6644 0.134881 13.6245 0.188508L12.2249 2.05469C12.1647 2.13494 12.132 2.23245 12.1316 2.33275V2.87581C11.1196 3.23657 10.2197 3.85619 9.52171 4.67295H6.15231C6.09861 4.66346 6.04366 4.66346 5.98995 4.67295H5.96103V4.67855C5.85726 4.70261 5.76485 4.76146 5.69916 4.84532C5.63347 4.92917 5.59845 5.03298 5.59992 5.1395C5.60049 5.3854 5.53617 5.6271 5.41346 5.84021C5.29074 6.05331 5.11399 6.23026 4.90102 6.35321C4.68806 6.47616 4.44643 6.54076 4.20053 6.54047C3.95462 6.54018 3.71314 6.47503 3.50046 6.35158C3.28743 6.22881 3.11056 6.05201 2.98769 5.83904C2.86481 5.62606 2.8003 5.38444 2.80065 5.13856C2.80153 5.07611 2.78986 5.01412 2.76634 4.95627C2.74282 4.89841 2.70792 4.84587 2.66372 4.80175C2.61951 4.75763 2.5669 4.72284 2.509 4.69943C2.45109 4.67602 2.38908 4.66448 2.32663 4.66549C2.26536 4.66646 2.20489 4.67949 2.14865 4.70384C2.09242 4.72819 2.04154 4.76338 1.9989 4.80739C1.95627 4.85141 1.92273 4.9034 1.90019 4.96038C1.87766 5.01736 1.86656 5.07823 1.86755 5.1395C1.86755 5.8981 2.25012 6.59139 2.86223 7.02528L0.0312269 15.1171C0.00146487 15.1943 -0.00723007 15.278 0.00603341 15.3597C0.00410004 15.3742 0.00285453 15.3888 0.00230103 15.4035C0.00230103 16.5171 0.444685 17.5851 1.23213 18.3726C2.01958 19.16 3.0876 19.6024 4.20122 19.6024C5.31484 19.6024 6.38285 19.16 7.1703 18.3726C7.95775 17.5851 8.40013 16.5171 8.40013 15.4035C8.39994 15.392 8.39931 15.3805 8.39827 15.369C8.41384 15.2845 8.40577 15.1973 8.37494 15.1171L5.54207 7.02341C6.02261 6.68097 6.35293 6.17896 6.47143 5.60511H12.1316V6.99822C12.1316 7.12195 12.1807 7.24062 12.2682 7.32811C12.3557 7.41561 12.4744 7.46476 12.5981 7.46476H12.6018V23.444C11.1444 23.6782 9.88188 24.2819 9.11022 25.1954H6.99956C6.87582 25.1954 6.75716 25.2445 6.66966 25.332C6.58217 25.4195 6.53301 25.5382 6.53301 25.6619V27.5281C6.53301 27.6518 6.58217 27.7705 6.66966 27.858C6.75716 27.9455 6.87582 27.9947 6.99956 27.9947H21.0015C21.1253 27.9947 21.2439 27.9455 21.3314 27.858C21.4189 27.7705 21.4681 27.6518 21.4681 27.5281V25.6619C21.4681 25.5382 21.4189 25.4195 21.3314 25.332C21.2439 25.2445 21.1253 25.1954 21.0015 25.1954H18.8965C18.1202 24.2772 16.853 23.6726 15.4011 23.4384V7.46476C15.5242 7.46378 15.6419 7.41419 15.7286 7.3268C15.8153 7.23941 15.8639 7.12131 15.8639 6.99822V5.60604H21.5241C21.6435 6.17989 21.9738 6.6847 22.4553 7.02714L19.6252 15.1171C19.5955 15.1943 19.5868 15.278 19.6 15.3597C19.5981 15.3742 19.5969 15.3888 19.5963 15.4035C19.5963 16.5171 20.0387 17.5851 20.8261 18.3726C21.6136 19.16 22.6816 19.6024 23.7952 19.6024C24.9088 19.6024 25.9769 19.16 26.7643 18.3726C27.5518 17.5851 27.9941 16.5171 27.9941 15.4035C27.9939 15.392 27.9933 15.3805 27.9923 15.369C28.0079 15.2845 27.9998 15.1973 27.9689 15.1171L25.137 7.02621C25.4406 6.81369 25.689 6.53163 25.8613 6.20358C26.0337 5.87553 26.1251 5.511 26.128 5.14043C26.1289 5.07916 26.1178 5.0183 26.0953 4.96131C26.0728 4.90433 26.0392 4.85235 25.9966 4.80833C25.954 4.76431 25.9031 4.72912 25.8469 4.70477C25.7906 4.68042 25.7301 4.66739 25.6689 4.66642C25.6063 4.66541 25.5443 4.67698 25.4863 4.70045C25.4283 4.72391 25.3757 4.75879 25.3314 4.80301C25.2872 4.84722 25.2524 4.89988 25.2289 4.95785C25.2054 5.01581 25.1939 5.0779 25.1949 5.14043C25.1954 5.38633 25.1311 5.62804 25.0084 5.84114C24.8857 6.05424 24.7089 6.2312 24.496 6.35415C24.283 6.4771 24.0414 6.54169 23.7955 6.5414C23.5496 6.54112 23.3081 6.47596 23.0954 6.35252C22.8824 6.22974 22.7055 6.05295 22.5826 5.83997C22.4598 5.62699 22.3952 5.38537 22.3956 5.1395C22.3969 5.0334 22.3621 4.93 22.2968 4.84637C22.2315 4.76275 22.1396 4.70388 22.0363 4.67948V4.67388H22.0056C21.9518 4.66439 21.8969 4.66439 21.8432 4.67388H18.4626C17.7627 3.87054 16.8678 3.26094 15.8639 2.90381V2.33275C15.8637 2.23213 15.831 2.13426 15.7706 2.05376L14.371 0.187575C14.329 0.131191 14.2747 0.0850352 14.2124 0.0525576C14.15 0.02008 14.0811 0.00212118 14.0108 2.37097e-05ZM13.9978 1.24477L14.9308 2.48951V6.53167H13.0647V2.48951L13.9978 1.24477ZM12.1316 3.88169V4.67295H10.8467C11.2349 4.34637 11.6669 4.0823 12.1316 3.88169ZM15.8639 3.90408C16.3202 4.10003 16.7429 4.35756 17.1273 4.67295H15.8639V3.90408ZM4.20028 4.67108C4.07655 4.67108 3.95788 4.72024 3.87039 4.80773C3.78289 4.89523 3.73374 5.01389 3.73374 5.13763C3.73374 5.26137 3.78289 5.38003 3.87039 5.46753C3.95788 5.55502 4.07655 5.60418 4.20028 5.60418C4.32402 5.60418 4.44269 5.55502 4.53018 5.46753C4.61768 5.38003 4.66683 5.26137 4.66683 5.13763C4.66683 5.01389 4.61768 4.89523 4.53018 4.80773C4.44269 4.72024 4.32402 4.67108 4.20028 4.67108ZM23.7952 4.67295C23.6715 4.67295 23.5528 4.7221 23.4653 4.8096C23.3778 4.89709 23.3287 5.01576 23.3287 5.1395C23.3287 5.26323 23.3778 5.3819 23.4653 5.46939C23.5528 5.55689 23.6715 5.60604 23.7952 5.60604C23.919 5.60604 24.0376 5.55689 24.1251 5.46939C24.2126 5.3819 24.2618 5.26323 24.2618 5.1395C24.2618 5.01576 24.2126 4.89709 24.1251 4.8096C24.0376 4.7221 23.919 4.67295 23.7952 4.67295ZM3.71694 7.40691C4.03793 7.47409 4.36637 7.47503 4.68736 7.40691L7.32241 14.937H1.08189L3.71694 7.40691ZM23.3119 7.40784C23.6329 7.47596 23.9632 7.47689 24.2832 7.40784L26.9173 14.937H20.6768L23.3119 7.40784ZM13.5349 7.46476H14.468V23.3292H13.5349V7.46476ZM1.05949 15.8701H7.34014C7.19178 16.8405 6.70004 17.7316 5.8332 18.2317C5.33679 18.5185 4.77359 18.6695 4.20028 18.6695C3.62697 18.6695 3.06378 18.5185 2.56737 18.2317C1.70053 17.7316 1.20786 16.8414 1.05949 15.8701ZM20.6544 15.8701H26.9351C26.7867 16.8405 26.295 17.7316 25.4281 18.2317C24.9317 18.5185 24.3685 18.6695 23.7952 18.6695C23.2219 18.6695 22.6587 18.5185 22.1623 18.2317C21.2955 17.7316 20.8028 16.8414 20.6544 15.8701ZM13.9119 24.2623C15.3059 24.2464 16.6085 24.6197 17.4894 25.1954H10.5201C11.3627 24.6477 12.5804 24.2772 13.9119 24.2623ZM7.46611 26.1285H20.535V27.0616H7.46611V26.1285Z"
            fill="white"
          />
        </motion.svg>
        <motion.div
          className="font-bold text-base text-center"
          // style={{ color: svgHover1 ? "#00FDFF" : "white" }}
        >
          Legal Efficiency
        </motion.div>
        <motion.div
          className="text-xs text-center lg:px-10"
          // style={{ color: svgHover1 ? "#00FDFF" : "white" }}
        >
          Summarize lengthy legal documents effortlessly and create customized
          drafts in minutes
        </motion.div>
      </motion.div>
      <motion.div
        onHoverStart={() => setSvgHover2(true)}
        onHoverEnd={() => setSvgHover2(false)}
        className="flex items-center justify-center  flex-col gap-3"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          // stroke={svgHover2 ? "#00FDFF" : "white"}
        >
          <path
            d="M15.7441 11.6294L15.8634 12.8222C16.5791 12.8222 17.2351 13.0607 17.7718 13.4782C17.8911 13.5974 18.0104 13.6571 18.1297 13.7764C18.4278 14.0745 18.726 14.492 18.8453 14.9095L19.9784 14.492C19.7399 13.9553 19.4417 13.4185 18.9646 13.0011C18.7857 12.8222 18.6068 12.7029 18.4875 12.5836C17.7122 12.0469 16.8773 11.689 15.9827 11.689C15.8634 11.6294 15.8038 11.6294 15.7441 11.6294Z"
            fill="white"
          />
          <path
            d="M24.6901 22.0064L25.2268 21.4696L23.0799 19.3227L22.066 20.3365V19.0245C22.7817 17.7125 22.9606 16.1619 22.722 14.6709C22.6028 14.0149 22.3642 13.3589 22.066 12.8222V7.8722L21.7082 7.51438L16.4004 2.2066L14.1938 0H2.74334C1.19276 0 0 1.2524 0 2.74334V25.2268C0 26.7774 1.2524 27.9702 2.74334 27.9702H19.3227C20.8136 27.9702 22.066 26.7178 22.066 25.2268V24.6305L22.1257 24.5708L25.0479 27.4931C25.3461 27.7913 25.7636 27.9702 26.1214 27.9702C26.5389 27.9702 26.8967 27.7913 27.1949 27.4931L27.5527 27.1352C28.1491 26.5389 28.1491 25.5847 27.5527 24.9883L24.6901 22.0064ZM16.2215 10.3174C16.5197 10.3174 16.7583 10.377 17.0564 10.4366C17.4739 10.4963 17.8317 10.6155 18.2492 10.7945C18.6667 10.9734 19.0841 11.2119 19.3823 11.4505C19.5612 11.5698 19.7401 11.7487 19.9787 11.9872C20.2173 12.2258 20.4558 12.524 20.6347 12.8222C20.754 12.9414 20.8136 13.1203 20.9329 13.2993C21.2311 13.7764 21.41 14.3727 21.5293 14.9691C21.7678 16.2215 21.5293 17.5335 20.9329 18.6667C20.6944 19.1438 20.3365 19.5612 19.9787 19.9787C19.442 20.5154 18.8456 20.8733 18.2492 21.1715C17.0564 21.7082 15.7444 21.7678 14.492 21.41C13.5974 21.1715 12.7625 20.6347 12.0469 19.9787C11.9276 19.8594 11.8083 19.6805 11.689 19.5612C11.5101 19.3823 11.3908 19.2034 11.2716 18.9649C11.033 18.5474 10.7945 18.1299 10.6752 17.6528C10.0788 15.6848 10.5559 13.4782 12.0469 11.9872C12.1065 11.9276 12.1065 11.9276 12.1661 11.8679C12.2854 11.7487 12.345 11.689 12.4643 11.6294C13.4185 10.7945 14.6113 10.3174 15.8637 10.3174C15.9233 10.3174 15.983 10.3174 16.0426 10.3174C16.1022 10.3174 16.1619 10.2577 16.2215 10.3174ZM14.492 1.90841L15.7444 3.16081L20.0383 7.45474H16.0426C15.2077 7.45474 14.492 6.73908 14.492 5.90415V1.90841ZM23.4973 21.4696L21.5889 23.4377L21.1715 22.9606L23.0799 21.0522L23.4973 21.4696ZM19.3227 26.7178H2.74334C1.84878 26.7178 1.19276 26.0021 1.19276 25.1672V2.62407C1.19276 1.7295 1.90841 1.07348 2.74334 1.07348H13.2993V5.90415C13.2993 7.45474 14.5517 8.6475 16.0426 8.6475H20.8733V11.0927C20.8733 11.0927 20.8733 11.033 20.8136 11.033C20.5751 10.7945 20.3365 10.5559 20.098 10.377C19.6805 10.0788 19.2034 9.78062 18.7263 9.54207C18.2492 9.36315 17.7721 9.18424 17.295 9.1246C16.9372 9.1246 16.5793 9.1246 16.3408 9.1246C16.2811 9.1246 16.1619 9.06496 16.1022 9.1246C14.3131 9.1246 12.5836 9.78062 11.3312 11.033L11.2716 11.0927C11.1523 11.2119 11.0927 11.2716 11.033 11.3908H3.69755V12.5836H10.0788C9.6017 13.4185 9.36315 14.3131 9.24388 15.2077H3.69755V16.4004H9.24388C9.30351 16.8775 9.36315 17.3546 9.48243 17.7721C9.6017 18.1896 9.78062 18.607 9.95953 19.0245H3.69755V20.2173H10.7348C10.8541 20.3962 11.033 20.5154 11.1523 20.6944C11.9872 21.5293 13.0011 22.1257 14.1342 22.4239C14.4324 22.4835 14.6709 22.5431 14.9691 22.6028C15.0288 22.6028 15.0288 22.6028 15.0884 22.6028C15.3866 22.6624 15.6251 22.6624 15.9233 22.6624C15.9233 22.6624 15.9233 22.6624 15.983 22.6624C16.0426 22.6624 16.0426 22.6624 16.1022 22.6624C16.2811 22.6624 16.4601 22.6624 16.5793 22.6624C16.639 22.6624 16.6986 22.6624 16.7583 22.6624C16.9372 22.6624 17.0564 22.6028 17.2354 22.6028C17.295 22.6028 17.3546 22.6028 17.4143 22.5431C17.5932 22.4835 17.7721 22.4835 17.8914 22.4239C17.951 22.4239 17.951 22.4239 18.0106 22.3642C18.2492 22.3046 18.4281 22.2449 18.607 22.1257C19.2034 21.8871 19.7998 21.5293 20.2769 21.0522L20.6944 21.4696L19.3227 22.8413L20.754 24.2726V25.0479C20.8733 26.0021 20.2173 26.7178 19.3227 26.7178ZM26.7178 26.2407L26.36 26.5985C26.2407 26.7178 26.0021 26.7178 25.8829 26.5985L22.9606 23.7359L23.7955 22.901L26.7178 25.8232C26.8967 25.8829 26.8967 26.1214 26.7178 26.2407Z"
            fill="white"
          />
          <path
            d="M11.0332 3.69763H3.69775V4.89039H11.0332V3.69763Z"
            fill="white"
          />
          <path
            d="M11.0332 7.5144H3.69775V8.70716H11.0332V7.5144Z"
            fill="white"
          />
          <path
            d="M18.309 22.901H3.69775V24.0938H18.309V22.901Z"
            fill="white"
          />
        </motion.svg>
        <motion.div
          className="font-bold text-base"
          // style={{ color: svgHover2 ? "#00FDFF" : "white" }}
        >
          Precision at Scale
        </motion.div>
        <motion.div
          className="text-center text-xs lg:px-10"
          // style={{ color: svgHover2 ? "#00FDFF" : "white" }}
        >
          Transform complex legalese into concise snippets with our AI-powered
          document wizard
        </motion.div>
      </motion.div>
      <motion.div
        onHoverStart={() => setSvgHover3(true)}
        onHoverEnd={() => setSvgHover3(false)}
        className="flex items-center  justify-center  flex-col gap-3"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          // stroke={svgHover3 ? "#00FDFF" : "white"}
        >
          <path
            d="M24.22 16.7936C25.0045 16.1335 25.5669 15.2482 25.8312 14.2577C26.0954 13.2672 26.0486 12.2195 25.6971 11.2565C25.3456 10.2935 24.7065 9.4618 23.8663 8.87416C23.0261 8.28652 22.0254 7.97135 21 7.97135C19.9746 7.97135 18.9739 8.28652 18.1337 8.87416C17.2935 9.4618 16.6544 10.2935 16.3029 11.2565C15.9514 12.2195 15.9046 13.2672 16.1688 14.2577C16.4331 15.2482 16.9955 16.1335 17.78 16.7936C17.5567 16.9085 17.3397 17.0353 17.13 17.1735C16.2359 15.2782 14.708 13.7544 12.81 12.8649C14.0755 12.0426 15.0412 10.8334 15.5631 9.41765C16.0851 8.00191 16.1353 6.45544 15.7063 5.00883C15.2773 3.56222 14.3921 2.29297 13.1827 1.39032C11.9732 0.48768 10.5043 0 8.995 0C7.48568 0 6.01678 0.48768 4.80733 1.39032C3.59788 2.29297 2.71267 3.56222 2.28369 5.00883C1.85471 6.45544 1.90493 8.00191 2.42688 9.41765C2.94882 10.8334 3.91453 12.0426 5.18 12.8649C3.63297 13.5898 2.32433 14.74 1.40704 16.181C0.489755 17.622 0.00172527 19.2943 0 21.0023V27.0003C0 27.2655 0.105357 27.5197 0.292893 27.7072C0.48043 27.8947 0.734784 28 1 28H27C27.2652 28 27.5196 27.8947 27.7071 27.7072C27.8946 27.5197 28 27.2655 28 27.0003V23.0016C27.999 21.72 27.646 20.4633 26.9794 19.3686C26.3128 18.2739 25.3583 17.3832 24.22 16.7936ZM18 13.0048C18 12.4117 18.1759 11.8319 18.5056 11.3387C18.8352 10.8455 19.3038 10.4611 19.8519 10.2341C20.4001 10.0071 21.0033 9.94772 21.5853 10.0634C22.1672 10.1792 22.7018 10.4648 23.1213 10.8842C23.5409 11.3036 23.8266 11.838 23.9424 12.4198C24.0581 13.0015 23.9987 13.6045 23.7716 14.1525C23.5446 14.7005 23.1601 15.1689 22.6667 15.4985C22.1734 15.828 21.5933 16.0039 21 16.0039C20.2044 16.0039 19.4413 15.6879 18.8787 15.1255C18.3161 14.5631 18 13.8002 18 13.0048ZM4 7.00679C4 6.0182 4.29324 5.05181 4.84265 4.22983C5.39206 3.40785 6.17295 2.7672 7.08658 2.38888C8.00021 2.01057 9.00555 1.91158 9.97545 2.10445C10.9454 2.29731 11.8363 2.77336 12.5355 3.4724C13.2348 4.17143 13.711 5.06206 13.9039 6.03165C14.0969 7.00124 13.9978 8.00625 13.6194 8.91959C13.241 9.83292 12.6001 10.6136 11.7779 11.1628C10.9556 11.712 9.98891 12.0052 9 12.0052C7.67392 12.0052 6.40215 11.4786 5.46447 10.5412C4.52678 9.6038 4 8.33244 4 7.00679ZM15 26.0006H2V21.0023C2 19.1463 2.7375 17.3664 4.05025 16.0541C5.36301 14.7418 7.14348 14.0045 9 14.0045C10.8565 14.0045 12.637 14.7418 13.9497 16.0541C15.2625 17.3664 16 19.1463 16 21.0023V26.0006H15ZM26 26.0006H18V21.0023C18.002 20.3913 17.9416 19.7816 17.82 19.1829C18.7053 18.423 19.8332 18.0046 21 18.0032C22.3261 18.0032 23.5979 18.5298 24.5355 19.4672C25.4732 20.4046 26 21.676 26 23.0016V26.0006Z"
            fill="white"
          />
        </motion.svg>
        <motion.div
          className="font-bold text-base"
          // style={{ color: svgHover3 ? "#00FDFF" : "white" }}
        >
          Your Legal Ally
        </motion.div>
        <motion.div
          className="text-xs text-center lg:px-10"
          // style={{ color: svgHover3 ? "#00FDFF" : "white" }}
        >
          From summaries to tailored drafts, streamline your legal work with our
          intuitive AI tool
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
