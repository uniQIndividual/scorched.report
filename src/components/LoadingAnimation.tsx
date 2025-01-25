import React from "react";

interface ProgressTitle {
    title: Partial<string>;
}
/* Adapted from https://www.bungie.net */
const spinner = <div className="w-24 h-24">
    <svg className="absolute w-24 h-24 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.12 107.52" width={"100%"} height={"100%"}>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute" points="1.4993555928857774,25.70919947248558 16.29799608155895,34.255527834132636 45.040645234973454,17.657660176081663 45.040645234973454,0.5799999237060547 1.4993555928857774,25.70919947248558 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_0.5s]" points="14.798639163130133,70.04514361060887 14.798639163130133,36.84941215063213 0,28.303083788985077 0,78.57647357327482 14.798639163130133,70.04514361060887 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_1s]" points="45.040645234973454,89.22190104230344 16.29799608155895,72.63902792710837 1.4993555928857774,81.18535821681803 45.040645234973454,106.31455390947235 45.040645234973454,89.22190104230344 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_1.5s]" points="91.58064449628182,81.18535821681803 76.76700789820188,72.63902792710837 48.03935328764328,89.22190104230344 48.03935328764328,106.31455390947235 91.58064449628182,81.18535821681803 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_2s]" points="78.2663619245368,36.84941215063213 78.2663619245368,70.04514361060887 93.07999852261673,78.57647357327482 93.07999852261673,28.303083788985077 78.2663619245368,36.84941215063213 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_2.5s]" points="48.03935328764328,0.5799999237060547 48.03935328764328,17.657660176081663 76.76700789820188,34.255527834132636 91.58064449628182,25.70919947248558 48.03935328764328,0.5799999237060547 ">
        </polygon>
    </svg>
    <svg className="absolute w-24 h-24 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.12 107.52" width={"100%"} height={"100%"}>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute" points="32.685951708002904,43.71646161198646 45.040645234973454,36.579529659851914 45.040645234973454,21.181146379706433 19.34168583473388,36.00977173645447 32.685951708002904,43.71646161198646 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_1.25s]" points="31.18659575360539,60.58420983275505 31.18659575360539,46.31034592848596 17.842331808398967,38.61865252387247 17.842331808398967,68.27590709349374 31.18659575360539,60.58420983275505 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_1s]" points="45.040645234973454,70.3150261013891 32.685951708002904,63.17809800537975 19.34168583473388,70.88478402478654 45.040645234973454,85.71341323765978 45.040645234973454,70.3150261013891 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.75s]" points="60.394042958488626,63.17809800537975 48.03935328764328,70.3150261013891 48.03935328764328,85.71341323765978 73.72331428890175,70.88478402478654 60.394042958488626,63.17809800537975 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.5s]" points="61.89339698482354,46.31034592848596 61.89339698482354,60.58420983275505 75.22266831523666,68.27590709349374 75.22266831523666,38.61865252387247 61.89339698482354,46.31034592848596 ">
        </polygon>
        <polygon className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.25s]" points="48.03935328764328,21.181146379706433 48.03935328764328,36.579529659851914 60.394042958488626,43.71646161198646 73.72331428890175,36.00977173645447 48.03935328764328,21.181146379706433 ">
        </polygon>
    </svg>
</div>

export default class LoadingAnimation extends React.Component {
    override render() {
        return (
            <div className="">
                {spinner}
            </div>
        );
    }
}

export class LoadingAnimationWithTitle extends React.Component<ProgressTitle> {
    override render() {
        return (
            <div className="">
                <div className="flex justify-center">
                    {spinner}
                </div>
                <div className="flex justify-center mt-4 text-lg text-gray-900 dark:text-gray-200">
                    {this.props.title}
                </div>
            </div>
        );
    }
}