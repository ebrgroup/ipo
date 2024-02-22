import { useState, useEffect } from "react";
import SearchComboBox from "./SearchComboBox";

function CitySearchComboBox(props) {

    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (() => {
            switch(props.province)
            {
                case "Azad Jammu & Kashmir":
                    setOptions(
                        [
                            "Bagh", "Bhimber", "Khuiratta", "Kotli", "Mangla", "Mirpur", "Muzaffarabad", "Plandri", "Punch", "Rawalakot"
                        ]
                    );
                    break;
                case "Balochistan":
                    setOptions(
                        [
                            "Amir Chah", "Bazdar", "Bela", "Bellpat", "Bagh", "Burj", "Chagai", "Chah Sandan", "Chaman", "Chakku", "Chhatr", "Dalbandin", 
                            "Dera Bugti", "Dhana Sar", "Diwana", "Duki", "Dushi", "Duzab", "Gajar", "Gandava", "Garhi Khairo", "Garruck", "Ghazluna", "Girdan", 
                            "Gulistan", "Gwadar", "Gwash", "Hab Chauki", "Hameedabad", "Harnai", "Hinglaj", "Hoshab", "Ispikan", "Jhal", "Jhal Jhao", "Jhatpat", 
                            "Jiwani", "Kalandi", "Kalat", "Kamararod", "Kanak", "Kandi", "Kanpur", "Kapip", "Kappar", "Karodi", "Katuri", "Kharan", "Khuzdar", 
                            "Kikki", "Kohan", "Kohli", "Korak", "Lahri", "Lasbela", "Liari", "Loralai", "Mach", "Mand", "Manguchar", "Mashki Chah", "Maslti", 
                            "Mastung", "Mekhtar", "Merui", "Mianez", "Murgha Kibzai", "Musa Khel Bazar", "Nagha Kalat", "Nal", "Naseerabad", "Nauroz Kalat", 
                            "Nur Gamma", "Nushki", "Nuttal", "Ormara", "Palantuk", "Panjgur", "Pasni", "Piharak", "Pishin", "Qamruddin Karez", "Qila Abdullah", 
                            "Qila Ladgasht", "Qila Safed", "Qila Saifullah", "Quetta", "Rakhni", "Robat Thana", "Rodkhan", "Saindak", "Sanjawi", "Saruna", 
                            "Shabaz Kalat", "Shahpur", "Sharam Jogizai", "Shingar", "Shorap", "Sibi", "Sonmiani", "Spezand", "Spintangi", "Sui", "Suntsar", 
                            "Surab", "Thalo", "Tump", "Turbat", "Umarao", "Pirmahal", "Uthal", "Vitakri", "Wadh", "Washap", "Wasjuk", "Yakmach", "Zhob", "Hub", 
                            "Bolan", "Jaffarabad", "Dhadar", "Ziarat"
                        ]    
                    );
                    break;
                case "FATA":
                    setOptions(
                        [
                            "Bajaur", "Hangu", "Malakand", "Miram Shah", "Mohmand", "Khuber", "Kurram", "North Waziristan", "Wana", "South Waziristan"
                        ]    
                    );
                    break;
                case "Gilgit Baltistan":
                    setOptions(
                        [
                            "Asqurdas", "Ghangche", "Gilgit", "Gultari", "Gupi", "Makhan Pura", "Nagar", "Shigar", "Skardu", "Sumo"
                        ]    
                    );
                    break;
                case "Islamabad Capital":
                    setOptions(
                        [
                            "Islamabad"
                        ]    
                    );
                    break;
                case "KPK":
                    setOptions(
                        [
                            "Abbottabad", "Ayubia", "Adezai", "Banda Daud Shan", "Bannu", "Batagram", "Birote", "Buner", "Charsadda", "Chakdara", "Chitral", 
                            "Dargai", "Darya Khan", "Dera Ismail Khan", "Drasan", "Drosh", "Hangu", "Haripur", "Kalam", "Karak", "Khanaspur", "Kohat", 
                            "Kohistan", "Lakki Marwat", "Latamber", "Lower Dir", "Madyan", "Malakand", "Mansehra", "Mardan", "Mastuj", "Mongora", "Nowshera", 
                            "Paharpur", "Peshawar", "Saidu Sharif", "Shangla", "Sakesar", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Tordher", "Upper Dir", 
                            "Basham"
                        ]    
                    );
                    break;
                case "Sindh":
                    setOptions(
                        [
                            "Ali Bandar", "Baden", "Chachro", "Dadu", "Digri", "Diplo", "Dokri", "Gadra", "Ghauspur", "Ghanian", "Ghotki", "Hala", "Hyderabad", 
                            "Islamkot", "Jacobabad", "Jamesabad", "Jamshoro", "Janghar", "Jati (Mughalbhin)", "Jhudo", "Jungshahi", "Kandiaro", "Karachi", 
                            "Kashmor", "Keti Bandar", "Khairpur", "Khora", "Klupro", "Khokhropur", "Korangi", "Kotri", "Kot Sarae", "Larkana", "Lund", "Mathi", 
                            "Matiari", "Mehar", "Mirpur Batoro", "Mirpur Khas", "Mirpur Sakro", "Mithi", "Mithani", "Moro", "Nagar Parkar", "Naushara", 
                            "Naudero", "Noushero Feroz", "Nawabshah", "Nazimabad", "Naokot", "Pendoo", "Pokran", "Qambar", "Qazi Ahmad", "Ranipur", "Ratodero", 
                            "Rohri", "Saidu Sharif", "Sakrand", "Sanghar", "Shadadkhot", "Shahbandar", "Shahdadpur", "Shahpur Chakar", "Shikarpur", "Sujawal", 
                            "Sukkur", "Tando Adam", "Tando Allahyar", "Tando Bago", "Tar Ahamd Rind", "Thatta", "Tujal", "Umarkot", "Veirwaro", "Warah", 
                            "Kandhkot"
                        ]    
                    );
                    break;
                case "Punjab":
                    setOptions(
                        [
                            "Ahmedpur East", "Ahmed Nager Chatha", "Ali Pur", "Arifwala", "Attock", "Basti Malook", "Bhagalchur", "Bhalwal", "Bahawalpur", 
                            "Bahawalnagar", "Bhaipheru", "Bhakkar", "Burewala", "Chailianwala", "Chakwal", "Chichawatni", "Chiniot", "Chowk Azam", 
                            "Chowk Sarwar Shaheed", "Daska", "Darya Khan", "Dera Ghazi Khan", "Derawar Fort", "Dhaular", "Dina City", "Dinga", "Dipalpur", 
                            "Faisalabad", "Fateh Jang", "Gadar", "Ghakhar Mandi", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", 
                            "Haveli Lakha", "Jampur", "Jhang", "Jhelum", "Kalabagh", "Karor Lal Esan", "Kasur", "Kamalia", "Kamokey", "Khanewal", "Khanpur", 
                            "Kharian", "Khushab", "Kot Addu", "Jahania", "Jalla Araain", "Jauharabad", "Laar", "Lahore", "Lalamusa", "Layyah", "Lodhran", 
                            "Mamoori", "Mandi Bahauddin", "Makhdoom Aali", "Mandi Warburton", "Mailsi", "Mian Channu", "Minawala", "Mianwali", "Multan", 
                            "Murree", "Muridke", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Rajan Pur", "Pak Pattan", "Panjgur", "Pattoki", 
                            "Pirmahal", "Qila Didar Singh", "Rabwah", "Raiwind", "Rajan Pur", "Rahim Yar Khan", "Rawalpindi", "Rohri", "Sadiqabad", 
                            "Safdar Abad (Dhaban Singh)", "Sahiwal", "Sangla Hill", "Sambrial", "Sarai Alamgir", "Sargodha", "Shakargarh", 
                            "Shafqat Shaheed Chowk", "Sheikhupura", "Sialkot", "Sohawa", "Sooianwala", "Sundar", "Talagang", "Takhtbai", "Taxila", 
                            "Toba Tek Singh", "Vehari", "Wah Cantonment", "Wazirabad", "Nankana Sahib", "Chishtian", "Tonsa Sharif", "Kabir Wala", "Tamawali", 
                            "Chunian", "Jaranwala", "Samundari"
                        ]
                    );
                    break;
                default:
                    break;
            }
        })();
    }, [props.province]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredOptions = options.filter((city) =>
        city.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SearchComboBox 
            selectedItem={props.selectedItem}
            province={props.province}
            menuType={props.menuType}
            isMenuActive={props.isMenuActive}
            toggleMenu={props.toggleMenu}
            handleOptionClick={props.handleOptionClick}
            filteredOptions={filteredOptions}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
        />
    );
}

export default CitySearchComboBox;