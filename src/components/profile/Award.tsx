import { Tooltip } from "react-tooltip";
import { awards } from "../../lib/entities";


interface Props {
    award: string,
    size: number
}

const hoverText = (award: string) => {
    return `<div style="padding: 12px; max-width: 240px; ">
            <table >
            <tbody>
                <tr>
                <td style="justify-content: center; display: flex; padding: 12px;">
                    <div style=" position: absolute; transform: rotate(45deg);` +
        (awards[award].glow == "shadow-award-glow" ? "box-shadow: 44px 44px 50px 30px rgba(240,217,170,0.8)" : "") +
        (awards[award].glow == "shadow-award-glowRed" ? "box-shadow: 44px 44px 50px 30px rgba(212,47,47,0.9)" : "") +
        `"></div>
                    <img style="" src=` + awards[award].src + ` />
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 6px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.5rem; color: rgb(255 255 255);">
                        ` + awards[award].text + `
                    </div>
                    </td>
                </tr>
                <tr >
                <td style="padding-bottom: 12px;">
                    <div style="text-align: center; line-height: 1.5rem; font-size: 1.125rem; color: rgb(255 255 255);">
                        ` + awards[award].description + `
                    </div>
                    </td>
                </tr>
               </tbody>
            </table>
        </div>`};

export const Award = ({ award, size }: Props) => {

    const iconSize = size + "px";
    const glowOffset = Math.floor(size / 2) + "px";

    if (awards.hasOwnProperty(award)) {
        return <div key={"div_" + award} className={"w-[" + iconSize + "] h-[" + iconSize + "]"}>
            <a
                data-tooltip-id={award + "_tooltip"}
                data-tooltip-html={hoverText(award)}
                className={"w-[" + iconSize + "] h-[" + iconSize + "]"}
            >
                <div style={{ marginTop: glowOffset, marginLeft: glowOffset }} className={awards[award].glow + " absolute rotate-45"}></div>
                <img src={awards[award].src} key={"img_" + award} width={iconSize} height={iconSize} className="" />
            </a>
            <Tooltip id={award + "_tooltip"} opacity={1} style={{ backgroundColor: "rgba(8,9,10,0.9)" }} />
        </div>
    }
    return <></>
}