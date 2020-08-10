import React from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M16.39194,15.91146 C16.1554477,15.91146 16.0003708,15.8491062 15.8171862,15.7395831 C15.7567708,15.7030754 15.6931246,15.6620446 15.6226938,15.6161677 L15.6197862,15.6145523 C15.5312631,15.5570446 15.4372477,15.4959831 15.3351554,15.43686 C15.0282323,15.2594908 14.6460323,15.0985985 14.1100477,15.0982754 L14.1097246,15.0982754 C13.3941092,15.0985985 12.9524631,15.3854908 12.5974015,15.6164908 C12.3143862,15.8003215 12.1434785,15.91146 11.8284785,15.9117831 C11.5134785,15.9111369 11.3432169,15.8003215 11.0592323,15.6155215 C10.7044938,15.3851677 10.2638169,15.0989215 9.54787846,15.0985985 C8.83194,15.0989215 8.39061692,15.3858138 8.03587846,15.6164908 C7.75286308,15.8006446 7.58163231,15.9117831 7.26630923,15.9117831 C6.95066308,15.9117831 6.78007846,15.8006446 6.49415538,15.6145523 C6.26444769,15.4652908 5.99790923,15.2934138 5.64414,15.1906754 C5.57564769,15.0197677 5.50424769,14.8094446 5.45643231,14.5945985 C5.40021692,14.37006 5.34497077,13.8466754 5.33850923,13.6715677 C5.33107846,13.4809523 5.35983231,13.2816138 5.40215538,13.0771062 C5.51749385,13.1249215 5.63250923,13.1976138 5.78080154,13.2938908 C6.14103231,13.5277985 6.58881692,13.8188908 7.32446308,13.8188908 C8.05978615,13.8188908 8.50789385,13.5281215 8.86812462,13.2938908 C9.14467846,13.1145831 9.31138615,13.0063523 9.60667846,13.0063523 C9.90132462,13.0063523 10.0680323,13.1145831 10.3449092,13.2938908 C10.7044938,13.5277985 11.1522785,13.8185677 11.8872785,13.8185677 L11.8885708,13.8185677 C12.6222785,13.8182446 13.06974,13.5274754 13.4299708,13.2932446 C13.7062015,13.1139369 13.8732323,13.0060292 14.1682015,13.0060292 C14.4628477,13.0060292 14.6295554,13.1139369 14.9064323,13.2935677 C15.26634,13.5274754 15.7144477,13.8185677 16.4500938,13.8185677 C17.1854169,13.8185677 17.6332015,13.5277985 17.9937554,13.2935677 C18.1384938,13.1995523 18.2518938,13.1281523 18.3649708,13.0800138 C18.4253862,13.3126292 18.4166631,13.56786 18.4072938,13.7797985 C18.37854,14.4340292 18.2622323,14.8805215 18.1562631,15.1609523 C17.7307708,15.2559369 17.4190015,15.4484908 17.1608631,15.6161677 C16.8781708,15.8003215 16.7075862,15.91146 16.39194,15.91146 L16.39194,15.91146 Z M16.6345708,17.3472138 C15.7884323,18.2153215 14.7578169,18.9693831 13.8393092,19.5509215 L12.8810631,20.2251831 L13.8225092,20.9918446 L10.1643092,20.9918446 L11.0569708,20.2316446 L10.0292631,19.5783831 C8.97021692,18.94386 8.00744769,18.4363062 7.04112462,17.3213677 C7.11349385,17.3278292 7.18747846,17.3323523 7.26630923,17.3323523 C8.00163231,17.3323523 8.44974,17.0415831 8.81029385,16.8073523 C9.08652462,16.6280446 9.25323231,16.5198138 9.54820154,16.5198138 C9.84317077,16.5198138 10.0102015,16.6280446 10.2867554,16.8073523 C10.64634,17.04126 11.0941246,17.3320292 11.8291246,17.3320292 L11.8304169,17.3320292 C12.5641246,17.3317062 13.0115862,17.0409369 13.3718169,16.8070292 C13.6480477,16.6277215 13.8150785,16.5194908 14.1100477,16.5194908 C14.4050169,16.5194908 14.5717246,16.6277215 14.8486015,16.8073523 C15.2085092,17.04126 15.6566169,17.3320292 16.39194,17.3320292 C16.4866015,17.3320292 16.5757708,17.3265369 16.6617092,17.3174908 C16.65234,17.3271831 16.64394,17.3375215 16.6345708,17.3472138 L16.6345708,17.3472138 Z M4.23940154,7.52535231 C4.23940154,5.84761385 5.60375538,4.48293692 7.28117077,4.48293692 C8.11987846,4.48293692 8.80254,5.16430615 8.80254,6.00236769 C8.80254,6.18070615 8.76150923,6.36195231 8.68332462,6.53996769 C8.55280154,6.83655231 8.31954,7.12344462 8.00098615,7.36898308 C7.45854,7.78769077 6.82143231,8.32561385 6.25378615,8.87710615 C5.91261692,9.20793692 5.59729385,9.54361385 5.34174,9.86184462 C4.64647846,9.28644462 4.23940154,8.43352154 4.23940154,7.52535231 L4.23940154,7.52535231 Z M8.00454,2.94670615 L15.9351092,2.94670615 L15.9351092,3.12504462 C14.6382785,3.45232154 13.6923092,4.64189077 13.6923092,6.00236769 C13.6923092,7.03459846 14.2334631,8.00253692 15.0844477,8.51396769 C15.8737246,9.07256769 17.2616631,10.2127062 17.9575708,11.7133985 C17.65614,11.8187215 17.4206169,11.97186 17.2196631,12.1023831 C16.9366477,12.2865369 16.76574,12.3979985 16.4500938,12.3979985 C16.1341246,12.3979985 15.96354,12.2865369 15.67794,12.1004446 C15.3235246,11.87106 14.8828477,11.5848138 14.1678785,11.5848138 C13.4525862,11.5848138 13.0115862,11.8713831 12.6555554,12.1027062 C12.37254,12.2865369 12.2016323,12.3979985 11.8866323,12.3983215 C11.5716323,12.3976754 11.4013708,12.2865369 11.1170631,12.1014138 C10.7626477,11.8717062 10.3216477,11.58546 9.60603231,11.5851369 C8.89009385,11.58546 8.44877077,11.8723523 8.09403231,12.1027062 C7.81069385,12.28686 7.64010923,12.3983215 7.32446308,12.3983215 C7.00881692,12.3983215 6.83823231,12.28686 6.55489385,12.1023831 C6.38043231,11.9889831 6.17754,11.8574908 5.92715538,11.7557215 C6.74195538,10.3387062 8.20290923,9.09292154 8.93306308,8.47002923 L8.98475538,8.42576769 C9.56047846,7.93436769 10.2470169,7.11439846 10.2470169,6.00042923 C10.2470169,4.64092154 9.30137077,3.45199846 8.00454,3.12504462 L8.00454,2.94670615 Z M17.2164323,4.55821385 C18.5730323,4.86481385 19.59654,6.08830615 19.5968631,7.52502923 C19.59654,7.58544462 19.5904015,7.64489077 19.5868477,7.70466 C19.5836169,7.75764462 19.58394,7.81127538 19.5781246,7.86329077 C19.5726323,7.91401385 19.5616477,7.96279846 19.5535708,8.01319846 C19.5438785,8.07264462 19.5367708,8.13338308 19.5238477,8.19186 C19.51674,8.22352154 19.5057554,8.25389077 19.4976785,8.28555231 C19.3426015,8.89229077 19.0059554,9.43312154 18.5135862,9.84472154 C17.8580631,8.93396769 16.9770323,8.08362923 15.8750169,7.30339846 C15.4143092,7.02619846 15.1393708,6.53964462 15.1393708,6.00236769 C15.1393708,5.18304462 15.80814,4.50264462 16.6168015,4.48519846 C16.8222785,4.48939846 17.0229092,4.51459846 17.2164323,4.55821385 L17.2164323,4.55821385 Z M19.8537092,13.6738292 C19.8537092,12.8105677 19.6530785,11.94666 19.2569862,11.1005215 C20.3793554,10.2530908 21.04134,8.93687538 21.04134,7.52535231 C21.04134,5.35653692 19.4876631,3.50982923 17.3818477,3.11599846 L17.3818477,1.69413692 L17.38314,1.50061385 C17.3356477,1.49964462 16.7121092,1.50093692 16.6588015,1.49996769 L7.28117077,1.49996769 C7.28117077,1.49996769 6.70609385,1.50255231 6.56006308,1.50093692 L6.55974,3.09435231 C4.39221692,3.44262923 2.79234,5.29773692 2.79234,7.52535231 C2.79234,8.92427538 3.44495538,10.2324138 4.55246308,11.08146 C4.11501692,11.9347062 3.89338615,12.8060446 3.89338615,13.6738292 C3.89338615,16.5808754 6.27995538,18.8417677 8.47655538,20.3065985 L6.41241692,21.32106 L6.40918615,22.3746138 L17.4991246,22.3746138 L17.5004169,21.1876292 L15.4068785,20.2135523 C17.5414477,18.7616446 19.8537092,16.5298292 19.8537092,13.6738292 L19.8537092,13.6738292 Z" />
    </g>
  </svg>
);
