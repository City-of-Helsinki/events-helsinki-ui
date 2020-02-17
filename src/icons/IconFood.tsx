import React from "react";

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M3.3132381,16.8217778 L3.39260317,16.8220952 L20.4833968,16.8735238 L20.362127,18.1659048 C20.2576825,19.2792381 19.9532381,20.7265397 19.0992698,21.2989206 C18.6970476,21.5693968 17.8706984,21.8125714 12.2678413,21.8125714 L12.2678413,21.8125714 L11.8449841,21.8119365 C5.4195873,21.7970159 4.86149206,21.4668571 4.5932381,21.308127 C4.11514286,21.0255873 3.3132381,20.2214603 3.3132381,18.0173333 L3.3132381,18.0173333 L3.3132381,16.8217778 Z M4.58371429,18.0954286 C4.59895238,19.6487619 5.06720635,20.0966984 5.2148254,20.1992381 C5.22466667,20.2062222 5.23355556,20.211619 5.23990476,20.215746 C5.3427619,20.2652698 6.16847619,20.5287619 11.8472063,20.5420952 L11.8472063,20.5420952 L12.5857366,20.5424127 C12.7933792,20.5419894 12.9934497,20.5411429 13.1868889,20.539873 C13.2468889,20.5395556 13.3040317,20.5389206 13.362127,20.5386032 C13.4446667,20.5379683 13.5287937,20.5373333 13.6084762,20.5366984 C13.6802222,20.5360635 13.7487937,20.5354286 13.8192698,20.5347937 C13.8818095,20.5338413 13.946254,20.5332063 14.0072063,20.5325714 C14.0500635,20.5319365 14.0900635,20.5313016 14.1322857,20.5306667 C14.2192698,20.5293968 14.3075238,20.5284444 14.3906984,20.5268571 L14.3906984,20.5268571 L14.4176825,20.5265397 C14.5275238,20.5246349 14.6348254,20.5227302 14.7386349,20.5208254 C14.782127,20.519873 14.8230794,20.5189206 14.865619,20.5179683 C14.9364127,20.516381 15.0094286,20.5147937 15.078,20.5132063 C15.1002222,20.5125714 15.1205397,20.5119365 15.1430794,20.511619 C15.2259365,20.5097143 15.3091111,20.5074921 15.3884762,20.5052698 C15.4164127,20.5043175 15.4424444,20.5033651 15.469746,20.5027302 C15.5411746,20.5005079 15.6135556,20.4982857 15.6827619,20.496381 C15.7043492,20.4954286 15.725619,20.4947937 15.7468889,20.4938413 C15.818,20.491619 15.8881587,20.4890794 15.9551429,20.4862222 C15.978,20.4855873 15.9995873,20.4846349 16.0214921,20.4836825 C16.0853016,20.4814603 16.1491111,20.4789206 16.2091111,20.4760635 C16.230381,20.4751111 16.250381,20.4741587 16.2710159,20.4732063 C16.3316508,20.4703492 16.3910159,20.468127 16.4481587,20.4652698 L16.4481587,20.4652698 L16.490381,20.4630476 C16.549746,20.459873 16.6094286,20.4566984 16.665619,20.4538413 L16.665619,20.4538413 L16.7129206,20.4509841 C16.766254,20.448127 16.8195873,20.4449524 16.8694286,20.4420952 C16.8805397,20.4411429 16.8906984,20.4405079 16.9024444,20.439873 C16.9548254,20.436381 17.006254,20.4328889 17.0548254,20.4297143 L17.0548254,20.4297143 L17.0891111,20.4271746 C17.1357778,20.424 17.1818095,20.4205079 17.2253016,20.4170159 C17.2364127,20.416381 17.2475238,20.415746 17.2583175,20.4147937 C17.3005397,20.4113016 17.342127,20.4078095 17.3814921,20.4043175 C17.3922857,20.4036825 17.4018095,20.4027302 17.4116508,20.4017778 C17.449746,20.3986032 17.4868889,20.3951111 17.5224444,20.391619 C17.5345079,20.3906667 17.5449841,20.3897143 17.5567302,20.3884444 C17.5894286,20.3852698 17.6208571,20.3820952 17.6510159,20.3786032 C17.6602222,20.3776508 17.6694286,20.3770159 17.6783175,20.3760635 C17.7091111,20.3725714 17.7389524,20.3690794 17.7672063,20.3659048 C17.7760952,20.3646349 17.7837143,20.364 17.7916508,20.3630476 C17.8186349,20.359873 17.8446667,20.356381 17.8691111,20.3532063 C17.8792698,20.3519365 17.8872063,20.3509841 17.8960952,20.3497143 C17.9195873,20.3465397 17.9418095,20.3433651 17.9627619,20.3405079 C17.969746,20.3392381 17.9751429,20.3382857 17.982127,20.3376508 C18.0030794,20.3344762 18.0243492,20.3313016 18.0433968,20.328127 C18.0510159,20.3268571 18.0567302,20.3255873 18.0643492,20.3246349 C18.0814921,20.3217778 18.0989524,20.3189206 18.1154603,20.315746 C18.1205397,20.3147937 18.1249841,20.3138413 18.1306984,20.3128889 C18.1468889,20.3100317 18.1624444,20.3071746 18.1770476,20.304 C18.1818095,20.3030476 18.185619,20.3024127 18.1894286,20.3014603 C18.2037143,20.2982857 18.2176825,20.295746 18.2300635,20.2928889 C18.2345079,20.2919365 18.238,20.2909841 18.2411746,20.2900317 C18.2529206,20.2871746 18.2649841,20.2846349 18.2754603,20.2820952 C18.2792698,20.2811429 18.2818095,20.2801905 18.2853016,20.2792381 C18.2948254,20.2766984 18.3043492,20.2741587 18.3122857,20.271619 C18.3164127,20.2709841 18.3189524,20.2697143 18.3224444,20.2687619 C18.3300635,20.2665397 18.3367302,20.2643175 18.3433968,20.2620952 C18.3459365,20.2611429 18.3484762,20.2601905 18.3510159,20.2592381 C18.3573651,20.2573333 18.3627619,20.2554286 18.3681587,20.2532063 C18.3706984,20.2525714 18.3719683,20.251619 18.373873,20.2506667 C18.3789524,20.2487619 18.3837143,20.2468571 18.3872063,20.2449524 C18.3887937,20.2446349 18.390381,20.2436825 18.3919683,20.2430476 C18.3951429,20.2414603 18.3983175,20.2401905 18.4002222,20.2389206 C18.6630794,20.0586032 18.909746,19.3811429 19.0399048,18.5189206 C19.0592698,18.395746 19.0748254,18.2687619 19.0884762,18.1392381 L19.0884762,18.1392381 Z M19.6233333,12.649619 C20.4988889,12.649619 21.2125397,13.3632698 21.2153968,14.2413651 C21.2153968,15.1191429 20.4988889,15.8327937 19.6233333,15.8327937 L19.6233333,15.8327937 L4.22587302,15.8327937 C3.34746032,15.8327937 2.6347619,15.1191429 2.6347619,14.2413651 C2.6347619,13.3632698 3.34746032,12.649619 4.22587302,12.649619 L4.22587302,12.649619 Z M19.6233333,13.8080317 L4.22587302,13.8080317 C3.9868254,13.8080317 3.79285714,14.0026349 3.79285714,14.2413651 C3.79285714,14.4800952 3.9868254,14.6746984 4.22587302,14.6746984 L4.22587302,14.6746984 L19.6233333,14.6746984 C19.8620635,14.6746984 20.0538095,14.4800952 20.0566667,14.2413651 C20.0566667,14.0026349 19.8620635,13.8080317 19.6233333,13.8080317 L19.6233333,13.8080317 Z M18.008381,9.86939683 C18.7566349,9.86939683 19.451873,10.1151111 19.9166349,10.5436825 C20.1521905,10.7608254 20.5274286,10.8855873 20.9464762,10.8874921 C20.9464762,11.2725714 20.9417143,11.559873 20.9417143,11.9982857 C20.1998095,11.9951111 19.5099683,11.7503492 19.0480635,11.3246349 C18.8109206,11.1059048 18.4315556,10.9805079 18.008381,10.9805079 C17.5848889,10.9805079 17.2064762,11.1059048 16.9696508,11.3246349 C16.5045714,11.7535238 15.8090159,11.9989206 15.0610794,11.9989206 C14.3137778,11.9989206 13.6179048,11.7535238 13.1528254,11.3246349 C12.9156825,11.1059048 12.5369524,10.9805079 12.1134603,10.9805079 C11.6906032,10.9805079 11.3121905,11.1059048 11.0744127,11.3246349 C10.6099683,11.7535238 9.91377778,11.9989206 9.16647619,11.9989206 C8.41822222,11.9989206 7.72330159,11.7535238 7.25790476,11.3246349 C7.02107937,11.1059048 6.64266667,10.9805079 6.2191746,10.9805079 C5.796,10.9805079 5.41663492,11.1059048 5.17949206,11.3246349 C4.7144127,11.7535238 4.01949206,11.9989206 3.2712381,11.9989206 L3.2712381,11.9989206 L2.87631746,11.9989206 L2.87631746,10.8878095 L3.2712381,10.8878095 C3.69409524,10.8878095 4.07346032,10.7624127 4.31092063,10.5436825 C4.776,10.1151111 5.47092063,9.86939683 6.2191746,9.86939683 C6.96647619,9.86939683 7.66203175,10.1151111 8.12679365,10.5436825 C8.36425397,10.7624127 8.74361905,10.8878095 9.16647619,10.8878095 C9.58965079,10.8878095 9.96806349,10.7624127 10.2055238,10.5436825 C10.6702857,10.1151111 11.3655238,9.86939683 12.1134603,9.86939683 C12.8613968,9.86939683 13.5572698,10.1151111 14.0223492,10.5436825 C14.2594921,10.7624127 14.6379048,10.8878095 15.0610794,10.8878095 C15.484254,10.8878095 15.8626667,10.7624127 16.1004444,10.5436825 C16.5648889,10.1151111 17.2610794,9.86939683 18.008381,9.86939683 Z M12.026381,1.99996825 C18.4482857,1.99996825 20.4003492,5.72726984 20.5349524,7.69838095 L20.5349524,7.69838095 L20.622254,8.98695238 L3.18130159,8.98695238 L3.3292381,7.65393651 C3.33590476,7.59711111 4.05019048,1.99996825 12.026381,1.99996825 Z M12.026381,3.29234921 C5.90003175,3.29234921 4.94669841,7.04663492 4.82796825,7.69488889 L4.82796825,7.69488889 L19.0384444,7.69488889 C18.8797143,6.11806349 17.2393968,3.29234921 12.026381,3.29234921 Z" />
    </g>
  </svg>
);