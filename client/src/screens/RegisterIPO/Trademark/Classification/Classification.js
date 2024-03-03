import { useEffect, useRef, useState } from "react";
import "./Classification.css";
import "../../../global-components/SearchComboBox/SearchComboBox.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { classification } from "../../../../assets/states/actions/Trademark registration/Trademark-action";
import { toast } from 'react-toastify';

const Classification = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(null);
    const searchInputRef = useRef(null);

    const classifications = [
        {
            id: 1,
            description: "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry; unprocessed artificial resins, unprocessed plastics; fire extinguishing and fire prevention compositions; tempering and soldering preparations; substances for tanning animal skins and hides; adhesives for use in industry; putties and other paste fillers; compost, manures, fertilizers; biological preparations for use in industry and science."
        },
        {
            id: 2,
            description: "Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants, dyes; inks for printing, marking and engraving; raw natural resins; metals in foil and powder form for use in painting, decorating, printing and art."
        },
        {
            id: 3,
            description: "Non-medicated cosmetics and toiletry preparations; non-medicated dentifrices; perfumery, essential oils; bleaching preparations and other substances for laundry use; cleaning, polishing, scouring and abrasive preparations."
        },
        {
            id: 4,
            description: "Industrial oils and greases, wax; lubricants; dust absorbing, wetting and binding compositions; fuels and illuminants; candles and wicks for lighting."
        },
        {
            id: 5,
            description: "Pharmaceuticals, medical and veterinary preparations; sanitary preparations for medical purposes; dietetic food and substances adapted for medical or veterinary use, food for babies; dietary supplements for human beings and animals; plasters, materials for dressings; material for stopping teeth, dental wax; disinfectants; preparations for destroying vermin; fungicides, herbicides."
        },
        {
            id: 6,
            description: "Common metals and their alloys, ores; metal materials for building and construction; transportable buildings of metal; non-electric cables and wires of common metal; small items of metal hardware; metal containers for storage or transport; safes."
        },
        {
            id: 7,
            description: "Machines, machine tools, power-operated tools; motors and engines, except for land vehicles; machine coupling and transmission components, except for land vehicles; agricultural implements, other than hand-operated hand tools; incubators for eggs; automatic vending machines."
        },
        {
            id: 8,
            description: "Hand tools and implements, hand-operated; cutlery; side arms, except firearms; razors."
        },
        {
            id: 9,
            description: "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments; apparatus and instruments for conducting, switching, transforming, accumulating, regulating or controlling the distribution or use of electricity; apparatus and instruments for recording, transmitting, reproducing or processing sound, images or data; recorded and downloadable media, computer software, blank digital or analogue recording and storage media; mechanisms for coin-operated apparatus; cash registers, calculating devices; computers and computer peripheral devices; diving suits, divers' masks, ear plugs for divers, nose clips for divers and swimmers, gloves for divers, breathing apparatus for underwater swimming; fire-extinguishing apparatus."
        },
        {
            id: 10,
            description: "Surgical, medical, dental and veterinary apparatus and instruments; artificial limbs, eyes and teeth; orthopaedic articles; suture materials; therapeutic and assistive devices adapted for persons with disabilities; massage apparatus; apparatus, devices and articles for nursing infants; sexual activity apparatus, devices and articles."
        },
        {
            id: 11,
            description: "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes."
        },
        {
            id: 12,
            description: "Vehicles; apparatus for locomotion by land, air or water."
        },
        {
            id: 13,
            description: "Firearms; ammunition and projectiles; explosives; fireworks."
        },
        {
            id: 14,
            description: "Precious metals and their alloys; jewellery, precious and semi-precious stones; horological and chronometric instruments."
        },
        {
            id: 15,
            description: "Musical instruments; music stands and stands for musical instruments; conductors' batons."
        },
        {
            id: 16,
            description: "Paper and cardboard; printed matter; bookbinding material; photographs; stationery and office requisites, except furniture; adhesives for stationery or household purposes; drawing materials and materials for artists; paintbrushes; instructional and teaching materials; plastic sheets, films and bags for wrapping and packaging; printers' type, printing blocks."
        },
        {
            id: 17,
            description: "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials; plastics and resins in extruded form for use in manufacture; packing, stopping and insulating materials; flexible pipes, tubes and hoses, not of metal."
        },
        {
            id: 18,
            description: "Leather and imitations of leather; animal skins and hides; luggage and carrying bags; umbrellas and parasols; walking sticks; whips, harness and saddlery; collars, leashes and clothing for animals."
        },
        {
            id: 19,
            description: "Materials, not of metal, for building and construction; rigid pipes, not of metal, for building; asphalt, pitch, tar and bitumen; transportable buildings, not of metal; monuments, not of metal."
        },
        {
            id: 20,
            description: "Furniture, mirrors, picture frames; containers, not of metal, for storage or transport; unworked or semi-worked bone, horn, whalebone or mother-of-pearl; shells; meerschaum; yellow amber."
        },
        {
            id: 21,
            description: "Household or kitchen utensils and containers; cookware and tableware, except forks, knives and spoons; combs and sponges; brushes, except paintbrushes; brush-making materials; articles for cleaning purposes; unworked or semi-worked glass, except building glass; glassware, porcelain and earthenware."
        },
        {
            id: 22,
            description: "Ropes and string; nets; tents and tarpaulins; awnings of textile or synthetic materials; sails; sacks for the transport and storage of materials in bulk; padding, cushioning and stuffing materials, except of paper, cardboard, rubber or plastics; raw fibrous textile materials and substitutes therefor."
        },
        {
            id: 23,
            description: "Yarns and threads for textile use."
        },
        {
            id: 24,
            description: "Textiles and substitutes for textiles; household linen; curtains of textile or plastic."
        },
        {
            id: 25,
            description: "Clothing, footwear, headwear."
        },
        {
            id: 26,
            description: "Lace, braid and embroidery, and haberdashery ribbons and bows; buttons, hooks and eyes, pins and needles; artificial flowers; hair decorations; false hair."
        },
        {
            id: 27,
            description: "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings, not of textile."
        },
        {
            id: 28,
            description: "Games, toys and playthings; video game apparatus; gymnastic and sporting articles; decorations for Christmas trees."
        },
        {
            id: 29,
            description: "Meat, fish, poultry and game; meat extracts; preserved, frozen, dried and cooked fruits and vegetables; jellies, jams, compotes; eggs; milk, cheese, butter, yogurt and other milk products; oils and fats for food."
        },
        {
            id: 30,
            description: "Coffee, tea, cocoa and artificial coffee; rice, pasta and noodles; tapioca and sago; flour and preparations made from cereals; bread, pastries and confectionery; chocolate; ice cream, sorbets and other edible ices; sugar, honey, treacle; yeast, baking powder; salt, seasonings, spices, preserved herbs; vinegar, sauces and other condiments; ice (frozen water)."
        },
        {
            id: 31,
            description: "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products; raw and unprocessed grains and seeds; fresh fruits and vegetables, fresh herbs; natural plants and flowers; bulbs, seedlings and seeds for planting; live animals; foodstuffs and beverages for animals; malt."
        },
        {
            id: 32,
            description: "Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages and fruit juices; syrups and other non-alcoholic preparations for making beverages."
        },
        {
            id: 33,
            description: "Alcoholic beverages, except beers; alcoholic preparations for making beverages."
        },
        {
            id: 34,
            description: "Tobacco and tobacco substitutes; cigarettes and cigars; electronic cigarettes and oral vaporizers for smokers; smokers' articles; matches."
        },
        {
            id: 35,
            description: "Advertising; business management, organization and administration; office functions."
        },
        {
            id: 36,
            description: "Financial, monetary and banking services; insurance services; real estate affairs."
        },
        {
            id: 37,
            description: "Construction services; installation and repair services; mining extraction, oil and gas drilling."
        },
        {
            id: 38,
            description: "Telecommunications services."
        },
        {
            id: 39,
            description: "Transport; packaging and storage of goods; travel arrangement."
        },
        {
            id: 40,
            description: "Treatment of materials; recycling of waste and trash; air purification and treatment of water; printing services; food and drink preservation."
        },
        {
            id: 41,
            description: "Education; providing of training; entertainment; sporting and cultural activities."
        },
        {
            id: 42,
            description: "Scientific and technological services and research and design relating thereto; industrial analysis, industrial research and industrial design services; quality control and authentication services; design and development of computer hardware and software."
        },
        {
            id: 43,
            description: "Services for providing food and drink; temporary accommodation."
        },
        {
            id: 44,
            description: "Medical services; veterinary services; hygienic and beauty care for human beings or animals; agriculture, aquaculture, horticulture and forestry services."
        },
        {
            id: 45,
            description: "Legal services; security services for the physical protection of tangible property and individuals; personal and social services rendered by others to meet the needs of individuals."
        }
    ];

    const [searchText, setSearchText] = useState("");
    const [isSearchOnFocus, setSearchOnFocus] = useState(false);
    const [activeOptionIndex, setActiveOptionIndex] = useState(0);
    const [classificationDescription, setDescription] = useState("");
    const filteredClassifications = classifications.filter((classification) =>
        classification.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const areRequiredFieldsEmpty = () => {
        return (searchText === "" && classificationDescription === "");
    };

    const handleDataAndNavigation = () => {
        if (!areRequiredFieldsEmpty()) {
            const classificationData = {
                classificationClass: searchText,
                classificationDescription
            };
            dispatch(classification(
                classificationData
            ));
            navigate("/ownerDetails")
        } else {
            handleToastDisplay("Required fields (*) are empty!", "error");
        }
    }

    const handleKeyDown = (e) => {
        if(isSearchOnFocus && filteredClassifications.length > 0) {
            if(e.key === "ArrowUp") {
                e.preventDefault();
                setActiveOptionIndex((activeOptionIndex - 1 + filteredClassifications.length) % filteredClassifications.length)
            } else if(e.key === "ArrowDown") {
                e.preventDefault();
                setActiveOptionIndex((activeOptionIndex + 1) % filteredClassifications.length);
            } else if (e.key === "Enter") {
                setSearchText(filteredClassifications[activeOptionIndex].id.toString());
            }
        }
    };
    

    // Logic for previous data
    //When back button is press
    // The previous data is kept safe
    const data = useSelector(state => state.trademarkRegistrationReducer?.classification);
    
    useEffect(() => {
        if (data) {
            const { classificationClass, classificationDescription } = data;
            setSearchText(classificationClass ? classificationClass.toLowerCase() : '');
            setDescription(classificationDescription ? classificationDescription.toLowerCase() : '');
        } else {
            setSearchText('');
            setDescription('');
        }
    }, []);
    

    const handleToastDisplay = (message, type) => {
        const toastConfig = {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        };

        switch (type) {
            case "success":
                toast.success(message, toastConfig);
                break;
            case "error":
                toast.error(message, toastConfig);
                break;
            default:
                toast(message, toastConfig);
                break;
        }
    };

    return (
        <div className="classificationBox">
            <h3>Trademark Classification</h3>
            <div>
                <span className="classificationLabel">
                    Classification <strong>*</strong>
                </span>
                <br />
                <div style={{ width: "100%" }} className="wrapper active">
                    <input
                        ref={searchInputRef}
                        className="classificationInput"
                        placeholder="Search here..."
                        onChange={(e) => { setSearchText(e.target.value) }}
                        onClick={() => setSearchOnFocus(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                setSearchOnFocus(false)
                            }, 300);
                        }}
                        value={searchText}
                        type="text"
                        spellCheck="false"
                        autoComplete="false"
                        onKeyDown={handleKeyDown}
                    />
                    {isSearchOnFocus && filteredClassifications.length > 0 && <div style={{ width: "88%" }} className="searchDropdownContent">
                        <ul className="searchDropdownOptions" style={{ maxHeight: "50vh" }}>
                            {filteredClassifications.map((item, index) => (
                                <li key={index} className={`classificationItem ${activeOptionIndex === index ? "active" : ""}`} onClick={() => {
                                    setSearchText(item.id.toString());
                                }}>
                                    <span>
                                        <b>{item.id} -</b> {`${item.description}`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>}
                </div>
            </div>
            <div>
                <span className="classificationLabel">
                    Details of Goods/Services <strong>*</strong>
                </span>
                <br />
                <textarea value={classificationDescription} className="classificationInput classificationTextArea"
                    onChange={(e) => setDescription(e.target.value)} rows="7" placeholder="Enter details here..." />
            </div>
            <div className="btns">
                <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
                <button className='continueBtn' onClick={handleDataAndNavigation}  >Continue</button>
            </div>
        </div>
    );
};

export default Classification;