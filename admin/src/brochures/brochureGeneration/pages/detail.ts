import type { Charter, NewConstruction, Yacht } from '../../../payload/payload-types'

export const generateBrochureDetailsPage = (doc: Yacht | Charter | NewConstruction): string => {
  var details = [
    { label: 'Builder', value: doc.builder ?? '' },
    { label: 'Year built', value: doc.yearBuilt ?? '' },
    { label: 'Year Refit', value: doc.yearRefit ?? '' },
    { label: 'Length', value: doc.length ?? '' },
    { label: 'LOA', value: doc.LOA ?? '' },
    { label: 'Beam', value: doc.beam ?? '' },
    { label: 'Max draft', value: doc.maxDraft ?? '' },
    { label: 'Min draft', value: doc.minDraft ?? '' },
    { label: 'Rooms', value: doc.rooms ?? '' },
    { label: 'People', value: doc.sleeps ?? '' },
    { label: 'Material', value: doc.material ?? '' },
    { label: 'Tonnage', value: doc.tonnage ?? '' },
  ]

  details = details.filter(detail => detail.value !== '')

  const sixDetails = details.slice(0, 6)
  const remainingDetails = details.slice(6, 12)

  const rootHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${doc.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-cover bg-center">
    <div class="w-screen h-screen flex flex-col justify-center items-center py-12 px-28" id="bg">
        <div class="w-full h-full flex flex-col items-center justify-between">
            <div class="flex flex-col items-center bg-black/50 h-full w-full">
                <h1 class="text-white text-6xl text-center font-slick pt-12 pb-10 px-20 uppercase drop-shadow-2xl">
                    General <br /> Specifications
                </h1>
                <div class="flex flex-row w-full justify-center">
                    <!-- 1st Columne -->
                    <div class="flex flex-col items-center w-1/3 gap-1">
                        ${sixDetails.map(detail => row(detail.label, detail.value.toString()))}
                    </div>
                    <!-- 2nd Column -->
                    <div class="flex flex-col items-center w-1/3 gap-1">
                        ${remainingDetails.map(detail =>
                          row(detail.label, detail.value.toString()),
                        )}
                    </div>
                </div>
                <span class="text-white text-4xl w-full text-center font-classic drop-shadow-2xl mt-6">
                    Asking Price: €${
                      typeof doc.price === 'object'
                        ? (doc.price as any).low + ' - ' + (doc.price as any).high
                        : doc.price || 'On application'
                    }
                </span>
            </div>
            <div class="flex flex-row items-center justify-center w-full mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 559.389 160.628"
                    class="fill-white h-12 shrink-0 mx-4">
                    <g id="Black" transform="translate(-751.816 -306.891)">
                        <g id="g18" transform="translate(897.741 375.048)">
                            <path id="path20"
                                d="M0,0H-68.354V27.605h55.441L8.479,52.433V64.2H-68.054A49.645,49.645,0,0,1-88.02,60.228,47.745,47.745,0,0,1-103.8,49.312a50.015,50.015,0,0,1-10.368-16.649,57.708,57.708,0,0,1-3.748-20.96,56.454,56.454,0,0,1,3.748-20.955A49.123,49.123,0,0,1-103.8-25.576a47.268,47.268,0,0,1,15.776-10.7,50.919,50.919,0,0,1,19.965-3.859h33.773l-23.96-28.023h-9.813a83.651,83.651,0,0,0-31,5.631,73.5,73.5,0,0,0-24.7,15.885A71.414,71.414,0,0,0-140.08-21.825a85.631,85.631,0,0,0-5.845,32.207A88.425,88.425,0,0,0-140.08,42.8,77.673,77.673,0,0,0-123.757,68.72a77.2,77.2,0,0,0,24.7,17.217,76,76,0,0,0,31,6.276H39.84V46.939Z">
                            </path>
                        </g>
                        <g id="g22" transform="translate(1034.23 307.129)">
                            <path id="path24"
                                d="M0,0-62.008,72.969-124.014,0H-160.43l83.8,97.952V159.9h.177l29.064-37.369V97.952L36.419,0Z">
                            </path>
                        </g>
                        <g id="g26" transform="translate(1069.384 369.018)">
                            <path id="path28" d="M0,0H-17.015L-23.48,7.479H-6.425Z"></path>
                        </g>
                        <g id="g30" transform="translate(1108.117 381.471)">
                            <path id="path32" d="M0,0H-66.295l-8.337,9.591H-8.277Z"></path>
                        </g>
                        <g id="g34" transform="translate(1027.107 398.783)">
                            <path id="path36" d="M0,0-12.048,14.081H144.176L156.149,0Z"></path>
                        </g>
                        <g id="g38" transform="translate(1009.292 421.83)">
                            <path id="path40" d="M0,0-35.244,45.688H263.089L301.913,0Z"></path>
                        </g>
                        <g id="g42" transform="translate(1008.489 456.608)">
                            <path id="path44" d="M0,0V-18.643H2.284V-2.5H16.813V0Z"></path>
                        </g>
                        <g id="g46" transform="translate(1046.052 447.307)">
                            <path id="path48"
                                d="M0,0Q0,5.168-2.476,7.369-4.684,9.305-9.444,9.3t-6.967-1.932Q-18.889,5.167-18.892,0V-9.34h2.287V0q0,4.086,1.824,5.56,1.522,1.24,5.337,1.245T-4.107,5.56Q-2.285,4.088-2.284,0V-9.34H0Z">
                            </path>
                        </g>
                        <g id="g50" transform="translate(1065.093 456.608)">
                            <path id="path52"
                                d="M0,0-6.783-7.521-13.595,0H-16.8l8.4-9.3-8.4-9.341h3.208L-6.783-11.1,0-18.643H3.216L-5.181-9.3,3.216,0Z">
                            </path>
                        </g>
                        <g id="g54" transform="translate(1089.442 447.307)">
                            <path id="path56"
                                d="M0,0Q0,5.168-2.479,7.369-4.683,9.305-9.447,9.3t-6.967-1.932q-2.476-2.2-2.48-7.369V-9.34h2.287V0q0,4.086,1.823,5.56Q-13.26,6.8-9.447,6.805T-4.108,5.56Q-2.288,4.088-2.285,0V-9.34H0Z">
                            </path>
                        </g>
                        <g id="g58" transform="translate(1108.673 456.608)">
                            <path id="path60"
                                d="M0,0-7.269-8.04h-6.263V0h-2.285V-18.643h8.841a21.476,21.476,0,0,1,6.269.693q3.77,1.188,3.769,4.616,0,4.75-7.2,5.2L3.209,0ZM.779-13.333q0-2.77-7.088-2.769h-7.223v5.528h7.4q6.9,0,6.907-2.759">
                            </path>
                        </g>
                        <g id="g62" transform="translate(1124.1 447.815)">
                            <path id="path64" d="M0,0V8.793H-2.287V0l-8.837-9.843h3.173l6.805,7.531L5.641-9.843H8.864Z">
                            </path>
                        </g>
                        <g id="g66" transform="translate(1152.959 447.815)">
                            <path id="path68" d="M0,0V8.793H-2.284V0l-8.841-9.843h3.177l6.807,7.531L5.641-9.843H8.864Z">
                            </path>
                        </g>
                        <g id="g70" transform="translate(1180.191 456.608)">
                            <path id="path72"
                                d="M0,0-1.808-3.417H-14.881L-16.691,0h-2.6l9.677-18.643h2.541L2.624,0ZM-8.349-16-13.577-5.952H-3.112Z">
                            </path>
                        </g>
                        <g id="g74" transform="translate(1203.568 452.192)">
                            <path id="path76"
                                d="M0,0Q-2.26,4.422-9.516,4.416q-4.864,0-7.429-1.876Q-19.993.246-20-4.891t3.051-7.443q2.576-1.894,7.429-1.887,7.226,0,9.493,4.427L-2.092-8.688a5.357,5.357,0,0,0-3.3-2.535,14.249,14.249,0,0,0-4.123-.463c-2.619,0-4.548.4-5.776,1.2-1.611,1.027-2.419,2.9-2.419,5.595S-16.9-.319-15.292.715A10.921,10.921,0,0,0-9.516,1.92a14.439,14.439,0,0,0,4.123-.463,5.387,5.387,0,0,0,3.3-2.541Z">
                            </path>
                        </g>
                        <g id="g78" transform="translate(1223.019 456.608)">
                            <path id="path80" d="M0,0V-8.04H-14.309V0h-2.284V-18.643h2.284v8.068H0v-8.068H2.287V0Z">
                            </path>
                        </g>
                        <g id="g82" transform="translate(1238.278 440.506)">
                            <path id="path84" d="M0,0V16.1H-2.289V0h-8.3V-2.535H8.291V0Z"></path>
                        </g>
                        <g id="g86" transform="translate(1269.912 451.343)">
                            <path id="path88"
                                d="M0,0Q0,3.492-3.967,4.673a26.548,26.548,0,0,1-6.513.592,29.787,29.787,0,0,1-5.909-.431c-2.436-.575-3.916-1.764-4.424-3.567l2.221-.687c.439,1.021,1.781,1.692,4.025,1.993a17.4,17.4,0,0,0,1.921.167q1.19.05,2.9.051c4.975,0,7.453-.932,7.453-2.792q0-1.984-3.707-2.557c-.464-.067-1.111-.123-1.947-.161s-1.875-.051-3.123-.051a20.826,20.826,0,0,1-6.172-.715q-3.722-1.222-3.723-4.584,0-3.508,3.965-4.684a24.568,24.568,0,0,1,6.515-.62,26.786,26.786,0,0,1,5.952.487q3.7.912,4.405,3.684l-2.225.625q-.606-1.6-3.939-2.071c-.472-.068-1.111-.123-1.92-.161s-1.8-.051-2.981-.051q-7.488,0-7.488,2.791,0,1.96,3.613,2.529c.468.073,1.111.123,1.931.168s1.825.061,3.027.061a21.607,21.607,0,0,1,6.309.7Q0-3.406,0,0">
                            </path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
</body>
<style>
    @font-face {
        font-family: 'Beausite Slick';
        font-weight: 400;
        font-style: normal;
        src: url('${
          process.env.PAYLOAD_PUBLIC_SERVER_URL
        }/images/Beausite Slick Trial Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Beausite Classic';
        font-weight: 400;
        font-style: normal;
        src: url('${
          process.env.PAYLOAD_PUBLIC_SERVER_URL
        }/images/Beausite Classic Regular.ttf') format('truetype');
    }

    body {
        background-image: url("${encodeURI((doc.photos.featured as any).url)}");
    }

    .font-slick {
        font-family: "Beausite Slick", serif;
    }

    .font-classic {
        font-family: "Beausite Classic", serif;
    }
</style>

</html>
`
  return rootHtml
}

const row = (label: string, value: string) => {
  return `
    <div class="flex flex-row items-center justify-between w-full">
        <span class="text-white text-3xl w-full mr-4 text-right font-classic drop-shadow-2xl">
            ${label}
        </span>
        <span
            class="text-white text-3xl w-full ml-4 text-left font-classic font-bold drop-shadow-2xl">
            ${value}
        </span>
    </div>`
}
