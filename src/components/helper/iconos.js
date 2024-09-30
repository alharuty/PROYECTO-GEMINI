import { library } from "@fortawesome/fontawesome-svg-core";
import { 
    faCartShopping,
    faXmark,
    faPenToSquare,
    faBagShopping,
    faTruck,
    faCreditCard,
    faHeadset,
    faPhone,
    faEnvelope,
    faHashtag

} from "@fortawesome/free-solid-svg-icons";

const Iconos = () => {
    library.add(
        faCartShopping,
        faXmark,
        faPenToSquare,
        faBagShopping,
        faTruck,
        faCreditCard,
        faHeadset,
        faPhone,
        faEnvelope,
        faHashtag
    );
};

export default Iconos;
