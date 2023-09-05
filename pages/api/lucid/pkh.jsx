import * as L from "lucid-cardano"

const kidusAddr = "addr1qylzgv9pud8mq0lsasv22ttqqxn2mrns5xp5dnylrx5q7m7uhtl9sm6ftgufx6rqvrmag42lu7mc83dqpr8fklzsqmdqvcqxce"
const kidusDetails = L.getAddressDetails(kidusAddr);
const kidusPKH = kidusDetails.paymentCredential.hash;

const simonAddr = "addr_test1qr7ccpy6e6cy2jfs94pph7tw6vlnzr3h553k306wcrpwnhdc48wz039t2h5y636cvm3pyjtjwn53s2h8j22rak9xzvysxwqs6r"
const simonDetails = L.getAddressDetails(simonAddr);
const simonPKH = simonDetails.paymentCredential.hash;

const edmundAddr = "addr_test1qzzanma8z97ltgkg4nup2ta8fyzrgnsz9ur28undfzczsrjy9axchrqjt0rtk22rxr2zp5rquku4a2k4c4cw0duwug2s62nzxf"
const edmundDetails = L.getAddressDetails(edmundAddr);
const edmundPKH = edmundDetails.paymentCredential.hash;

export const checkTutorCredentials = (pkh) => {
    return pkh === kidusPKH;
}

export const checkSchoolCredentials = (pkh) => {
    return pkh === edmundPKH;
}

export const checkAuthorityCredentials = (pkh) => {
    return pkh === simonPKH;
}
