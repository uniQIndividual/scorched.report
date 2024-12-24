import React from "react";


export default class LoadingAnimation extends React.Component {
    override render() {
        return (
            <div className="">
                    <img className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.25s] rotate-[60deg]" src="/images/icons/spinner_inner_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.5s] rotate-[120deg]" src="/images/icons/spinner_inner_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_inner absolute" src="/images/icons/spinner_inner_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_0.75s] rotate-[180deg]" src="/images/icons/spinner_inner_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_1s] rotate-[240deg]" src="/images/icons/spinner_inner_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_inner absolute [animation-delay:_1.25s] rotate-[300deg]" src="/images/icons/spinner_inner_part.png"  />

                    <img className="opacity-0 animate-bungie_loading_outer absolute" src="/images/icons/spinner_outer_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_0.5s] rotate-[300deg]" src="/images/icons/spinner_outer_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_1s] rotate-[240deg]" src="/images/icons/spinner_outer_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_1.5s] rotate-[180deg]" src="/images/icons/spinner_outer_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_2s] rotate-[120deg]" src="/images/icons/spinner_outer_part.png"  />
                    <img className="opacity-0 animate-bungie_loading_outer absolute [animation-delay:_2.5s] rotate-[60deg]" src="/images/icons/spinner_outer_part.png"  />
            </div>
        );
    }
}