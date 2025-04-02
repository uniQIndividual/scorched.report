interface Props {
    profileName :string,
    lightLevel :number,
    clanName :string,
    bannerUrl :string,
}

export const CharacterBanner = ({profileName, lightLevel, clanName, bannerUrl }: Props) => {

    return <div className="bg-no-repeat w-[300px] sm:w-[474px] sm:h-[96px]" style={{ backgroundImage: (bannerUrl != "" ? "url(https://www.bungie.net" + bannerUrl + ")" : "") }}>
                    <table className=" ml-[86px] max-w-[388px]">
                        <tbody>
                            <tr className="mt-1">
                                <td className="m-0 p-0">
                                    <table className="mr-2 h-11">
                                        <tbody>
                                            <tr>
                                                <td className=" text-white text-2xl sm:text-3xl font-bungo leading-none m-0 p-0 ">
                                                    <span className="w-[110px] sm:w-[268px] block truncate">
                                                        {profileName}
                                                    </span>
                                                    {/*<div className="w-[268px] h-[48px]">
                                                        <svg viewBox="0 0 48 26" width={"100%"} height={"100%"}>
                                                            <text x="-48" y="20" textAnchor="">{"12345678901234567890"}</text>
                                                        </svg></div>*/}
                                                </td>
                                                <td className="font-bungo font-[500] text-[#D3BF4A] text-[30px] sm:text-[42px] pr-3 leading-none m-2 sm:m-0 text-right flex">
                                                    <img src="/images/icons/ll.png" className="w-[14px] h-[14px] float-right object-scale-down mt-2" />
                                                    {lightLevel}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table className="mr-2 h-11">
                                        <tbody>
                                            <tr>
                                                <td className=" text-white opacity-40 font-bungo text-[22px] flex leading-none m-0 p-0 w-[58px] sm:w-[218px] h-[44px] ">
                                                    <span className=" pt-2 block truncate ...">
                                                        {clanName}
                                                    </span>
                                                </td>
                                                <td className={"w-[170px] max-h-12 leading-none m-0 p-0 left-0 text-right"}>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
}