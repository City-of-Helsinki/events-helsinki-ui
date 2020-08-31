import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M8.47991714,15.5125424 C9.36803766,15.5125424 10.090177,16.2350282 10.090177,17.1224557 L10.090177,17.6553974 L2.33653484,17.6553974 L2.33653484,16.3836836 C2.33653484,15.6514953 2.76760075,14.9861846 3.43499058,14.6874878 L5.24172505,13.9012429 L5.70328437,14.3628023 C6.44482863,15.1036535 7.43101318,15.5125424 8.47991714,15.5125424 M18.8646554,15.0035104 L18.8646554,17.6553974 L16.2134614,17.6553974 C16.5322561,16.3511111 17.5607156,15.3226516 18.8646554,15.0035104 M22.2490772,9.3393597 C21.8738004,9.1380339 21.4236761,8.89720527 20.7015367,8.8112693 L20.7015367,4.8 L10.3181846,4.8 L10.2946215,4.8 L10.2973936,8.08427872 C10.2987797,9.06387947 9.71871186,9.94957439 8.8212354,10.3400979 L2.69448588,13.0072316 C1.36005273,13.5994275 0.5,14.9234652 0.5,16.3836836 L0.5,19.4912392 L20.7015367,19.4912392 L20.7015367,13.0820791 C20.0393446,12.9989153 19.409032,13.0543578 18.8646554,13.122968 L18.8646554,13.1319774 C16.5457702,13.4996309 14.7095819,15.3358192 14.3415819,17.6553974 L11.9267119,17.6553974 L11.9267119,17.1224557 C11.9267119,15.222162 10.3805574,13.675661 8.47991714,13.675661 C7.94558945,13.675661 7.44348776,13.4750282 7.05504331,13.111533 L9.55411676,12.0245122 C11.1234878,11.3415292 12.136354,9.7939887 12.1339284,8.08358569 L12.1328889,6.63653484 L18.8646554,6.63653484 L18.8646554,8.95957815 C18.5181394,9.0687307 18.2509755,9.21149529 18.0136121,9.3393597 C17.6286328,9.54519021 17.37429,9.68171751 16.7626893,9.68171751 C16.1510885,9.68171751 15.8970923,9.54519021 15.512113,9.3393597 C15.0463955,9.08952166 14.4670207,8.77835028 13.3942072,8.77835028 L13.3942072,10.6148851 C14.0054614,10.6148851 14.2598041,10.7517589 14.6444369,10.9572429 C15.1101544,11.2074275 15.6898757,11.5182524 16.7626893,11.5182524 C17.3496874,11.5182524 17.7887232,11.4250395 18.142516,11.2999473 C18.8771299,11.0268927 19.2690395,10.5996384 20.1315179,10.5996384 C20.3415066,10.5996384 20.5307043,10.6273597 20.7015367,10.6713672 L20.7015367,10.6706742 C20.8311337,10.7004746 20.9437514,10.74171 21.0546365,10.7919548 C21.2441808,10.8716535 21.4032316,10.9641733 21.5383729,11.0410998 C21.9794878,11.271533 22.5436158,11.5182524 23.5,11.5182524 L23.5,9.68171751 C22.8883992,9.68171751 22.6340565,9.54519021 22.2490772,9.3393597" />
    </g>
  </svg>
);
