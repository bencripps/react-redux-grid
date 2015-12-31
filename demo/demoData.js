export const pageSize = 20;

export const events = {
    HANDLE_CELL_CLICK: (cell, reactEvent, id, browserEvent) => {
        console.log('On Cell Click Event');
    },
    HANDLE_CELL_DOUBLE_CLICK: (cell, reactEvent, id, browserEvent) => {
        console.log('On Cell Double Click Event');
    },
    HANDLE_ROW_CLICK: (row, reactEvent, id, browserEvent) => {
        console.log('On Row Click Event');
    },
    HANDLE_ROW_DOUBLE_CLICK: (row, reactEvent, id, browserEvent) => {
        console.log('On Row Double Click Event');
    },
    HANDLE_BEFORE_SELECTION: () => {
        console.log('On Before Selection')
    },
    HANDLE_AFTER_SELECTION: () => {
        console.log('On After Selection');
    },
    HANDLE_AFTER_INLINE_EDITOR_SAVE: () => {
        console.log('On After Save Inline Editor Event');
    },
    HANDLE_BEFORE_BULKACTION_SHOW: () => {
        console.log('On Before Bulk Action Show');
    },  
    HANDLE_AFTER_BULKACTION_SHOW: () => {
        console.log('On After Bulk Action Show');
    }
};

export const dataSource = 'http://localhost:3000/getfakeData';

export const plugins = {
    COLUMN_MANAGER: {
        resizable: true
    },
    EDITOR: {
        type: 'inline',
        enabled: true
    },
    PAGER: {
        enabled: true,
        pagingType: 'remote',
        pagingSource: 'http://localhost:3000/getFakedPagedData'
    },
    LOADER: {
        enabled: true
    },
    SELECTION_MODEL: {
        mode: 'checkbox-multi',
        enabled: true,
        allowDeselect: true,
        activeCls: 'active-class',
        selectionEvent: 'singleclick'
    },
    ERROR_HANDLER: {
        defaultErrorMessage: 'AN ERROR OCURRED',
        enabled: true
    },
    BULK_ACTIONS: {
        enabled: true,
        actions: [
            {
                text: 'Move',
                EVENT_HANDLER: () => {
                    
                }
            },
            {
                text: 'Add',
                EVENT_HANDLER: () => {

                }
            }
        ]
    },
    GRID_ACTIONS: {
        iconCls: 'fa fa-ellipsis-v',
        menu: [
            {
                text: 'Delete',
                EVENT_HANDLER: () => {
                    
                }
            }
        ]
    }
};

export const columns = [
    {
        name: 'Name',
        width: '10%',
        className: 'additional-class',
        renderer: () => { return 'Name'; },
        HANDLE_CLICK: () => { console.log('Header Click'); }
    },
    {
        name: 'Phone Number',
        width: '20%',
        className: 'additional-class'
    },
    {
        name: 'Email',
        width: '25%',
        className: 'additional-class'
    },
    {
        name: 'Address',
        width: '35%',
        className: 'additional-class'
    }
];


export const data = [
    {
        "Name": "Sawyer",
        "Phone Number": "(209) 915-9426",
        "Email": "dui.nec@Seddictum.co.uk",
        "Address": "7815 Accumsan St."
    },
    {
        "Name": "Chadwick",
        "Phone Number": "(666) 320-2563",
        "Email": "vitae.sodales@leoMorbi.com",
        "Address": "P.O. Box 994, 452 Sed Rd."
    },
    {
        "Name": "Amir",
        "Phone Number": "(389) 820-0954",
        "Email": "ut.dolor.dapibus@ametconsectetuer.edu",
        "Address": "P.O. Box 266, 3974 Aptent St."
    },
    {
        "Name": "Evan",
        "Phone Number": "(302) 529-2950",
        "Email": "Integer.tincidunt@pellentesquetellus.org",
        "Address": "Ap #357-1548 Orci. St."
    },
    {
        "Name": "Neville",
        "Phone Number": "(237) 790-0165",
        "Email": "ornare.egestas@anteiaculis.net",
        "Address": "P.O. Box 773, 7431 Massa. St."
    },
    {
        "Name": "Felix",
        "Phone Number": "(191) 624-5762",
        "Email": "ipsum.Donec.sollicitudin@tristique.edu",
        "Address": "928 Velit Av."
    },
    {
        "Name": "Asher",
        "Phone Number": "(481) 326-1028",
        "Email": "Mauris@velitAliquamnisl.com",
        "Address": "Ap #962-9677 Amet St."
    },
    {
        "Name": "Rahim",
        "Phone Number": "(946) 134-9286",
        "Email": "eget.mollis@enimmitempor.co.uk",
        "Address": "Ap #302-3189 Urna Road"
    },
    {
        "Name": "Perry",
        "Phone Number": "(372) 299-0265",
        "Email": "lorem.ac.risus@nisisem.net",
        "Address": "Ap #321-1993 Vestibulum St."
    },
    {
        "Name": "Sean",
        "Phone Number": "(246) 513-8870",
        "Email": "aliquet@dolor.net",
        "Address": "8860 Erat Road"
    },
    {
        "Name": "Jonas",
        "Phone Number": "(407) 273-5352",
        "Email": "quis@Phasellus.org",
        "Address": "8531 Nec, Street"
    },
    {
        "Name": "Cadman",
        "Phone Number": "(621) 978-5580",
        "Email": "nulla@habitant.com",
        "Address": "Ap #781-3859 Imperdiet, Road"
    },
    {
        "Name": "Tanner",
        "Phone Number": "(989) 608-0827",
        "Email": "auctor@Etiamlaoreetlibero.com",
        "Address": "P.O. Box 789, 2025 Nunc. Street"
    },
    {
        "Name": "Tyrone",
        "Phone Number": "(494) 411-2436",
        "Email": "auctor.velit.eget@bibendumDonecfelis.co.uk",
        "Address": "210-446 Vivamus Av."
    },
    {
        "Name": "Axel",
        "Phone Number": "(712) 326-4151",
        "Email": "feugiat.placerat@acturpisegestas.ca",
        "Address": "5764 Fermentum Rd."
    },
    {
        "Name": "Fletcher",
        "Phone Number": "(604) 139-1223",
        "Email": "venenatis@idanteNunc.co.uk",
        "Address": "P.O. Box 254, 624 Augue Road"
    },
    {
        "Name": "Fuller",
        "Phone Number": "(447) 480-6013",
        "Email": "massa@Proindolor.net",
        "Address": "Ap #931-3695 Pede Ave"
    },
    {
        "Name": "Quinlan",
        "Phone Number": "(576) 903-5533",
        "Email": "nisi@IntegermollisInteger.edu",
        "Address": "8857 Sed Avenue"
    },
    {
        "Name": "Bevis",
        "Phone Number": "(102) 626-7538",
        "Email": "pede.Cum@molestiearcuSed.co.uk",
        "Address": "5771 Auctor St."
    },
    {
        "Name": "Mason",
        "Phone Number": "(475) 513-3225",
        "Email": "Sed@sodalesnisimagna.org",
        "Address": "Ap #520-277 Hendrerit. Avenue"
    },
    {
        "Name": "Zeus",
        "Phone Number": "(464) 126-8665",
        "Email": "sem.magna@facilisis.ca",
        "Address": "P.O. Box 504, 3106 Dui, Rd."
    },
    {
        "Name": "Luke",
        "Phone Number": "(420) 633-9840",
        "Email": "justo.sit.amet@Donecsollicitudinadipiscing.net",
        "Address": "Ap #561-2807 Cras Rd."
    },
    {
        "Name": "Igor",
        "Phone Number": "(998) 792-5924",
        "Email": "rutrum@magnisdis.com",
        "Address": "229 Cursus St."
    },
    {
        "Name": "Ivan",
        "Phone Number": "(715) 643-9507",
        "Email": "diam@quis.org",
        "Address": "4368 Mi Rd."
    },
    {
        "Name": "Alfonso",
        "Phone Number": "(747) 561-6100",
        "Email": "augue.ac@nullavulputate.ca",
        "Address": "8642 Et Rd."
    },
    {
        "Name": "Dieter",
        "Phone Number": "(900) 616-0098",
        "Email": "ullamcorper.eu@quisurnaNunc.org",
        "Address": "P.O. Box 854, 8731 Duis Street"
    },
    {
        "Name": "Acton",
        "Phone Number": "(278) 960-5804",
        "Email": "at.egestas.a@lacinia.edu",
        "Address": "1321 Ante St."
    },
    {
        "Name": "Giacomo",
        "Phone Number": "(100) 899-6640",
        "Email": "Nulla@sociis.net",
        "Address": "Ap #561-2209 Nec Ave"
    },
    {
        "Name": "Keefe",
        "Phone Number": "(359) 202-5916",
        "Email": "dui.nec@tempor.ca",
        "Address": "Ap #388-1357 Urna Rd."
    },
    {
        "Name": "Rudyard",
        "Phone Number": "(634) 237-2678",
        "Email": "tellus.imperdiet@eget.edu",
        "Address": "578-4342 Nulla Ave"
    },
    {
        "Name": "Francis",
        "Phone Number": "(665) 617-5466",
        "Email": "accumsan.neque.et@Fuscedolor.net",
        "Address": "Ap #760-9132 Tellus Road"
    },
    {
        "Name": "Dustin",
        "Phone Number": "(790) 118-0845",
        "Email": "arcu.ac@diamluctuslobortis.org",
        "Address": "Ap #406-9858 Ridiculus Road"
    },
    {
        "Name": "Lee",
        "Phone Number": "(842) 177-2562",
        "Email": "sed.pede@risusDonecegestas.co.uk",
        "Address": "7882 Malesuada. Rd."
    },
    {
        "Name": "Igor",
        "Phone Number": "(701) 152-7019",
        "Email": "vestibulum.massa.rutrum@risus.net",
        "Address": "P.O. Box 539, 2675 Et Av."
    },
    {
        "Name": "Solomon",
        "Phone Number": "(244) 760-5204",
        "Email": "montes.nascetur@leoCras.com",
        "Address": "P.O. Box 177, 6365 Vestibulum Av."
    },
    {
        "Name": "Kennan",
        "Phone Number": "(777) 774-9847",
        "Email": "dictum.Proin@nibhPhasellusnulla.com",
        "Address": "P.O. Box 953, 3373 Vehicula. Road"
    },
    {
        "Name": "Steel",
        "Phone Number": "(556) 195-8066",
        "Email": "sit@natoquepenatibus.edu",
        "Address": "719-1929 Pede. St."
    },
    {
        "Name": "Garrett",
        "Phone Number": "(138) 624-4370",
        "Email": "tempor.diam.dictum@euplacerat.net",
        "Address": "999-3517 Sem Ave"
    },
    {
        "Name": "Malik",
        "Phone Number": "(629) 144-6020",
        "Email": "eu@aliquamarcuAliquam.edu",
        "Address": "5842 Eros Ave"
    },
    {
        "Name": "Chase",
        "Phone Number": "(636) 739-8433",
        "Email": "libero.dui@ornaretortorat.edu",
        "Address": "3352 Quis, Rd."
    },
    {
        "Name": "Thor",
        "Phone Number": "(810) 104-3527",
        "Email": "Phasellus.fermentum.convallis@eu.org",
        "Address": "9899 Quam Rd."
    },
    {
        "Name": "Galvin",
        "Phone Number": "(150) 341-8938",
        "Email": "eros@dictum.net",
        "Address": "421-8417 A, Avenue"
    },
    {
        "Name": "Guy",
        "Phone Number": "(553) 700-1709",
        "Email": "Nulla.semper@a.net",
        "Address": "213-3552 Pellentesque Road"
    },
    {
        "Name": "Kadeem",
        "Phone Number": "(814) 897-9150",
        "Email": "risus.Nunc.ac@aliquetmagnaa.com",
        "Address": "P.O. Box 793, 4392 Quis Avenue"
    },
    {
        "Name": "Ashton",
        "Phone Number": "(716) 834-5448",
        "Email": "nibh.lacinia@enim.com",
        "Address": "P.O. Box 379, 136 Rutrum St."
    },
    {
        "Name": "Gannon",
        "Phone Number": "(633) 555-5994",
        "Email": "eget.ipsum@nec.edu",
        "Address": "763-3388 Gravida Ave"
    },
    {
        "Name": "Castor",
        "Phone Number": "(354) 852-5408",
        "Email": "Proin.eget.odio@euaugueporttitor.org",
        "Address": "P.O. Box 208, 3152 Dolor. Ave"
    },
    {
        "Name": "Keaton",
        "Phone Number": "(383) 768-3997",
        "Email": "laoreet.posuere@Phasellus.net",
        "Address": "Ap #241-3156 Eu St."
    },
    {
        "Name": "Joel",
        "Phone Number": "(704) 718-4357",
        "Email": "Duis@vulputateeuodio.co.uk",
        "Address": "781-7343 Odio. St."
    },
    {
        "Name": "Harrison",
        "Phone Number": "(936) 355-8360",
        "Email": "ante.dictum@Maurisutquam.net",
        "Address": "8030 Penatibus St."
    },
    {
        "Name": "Lyle",
        "Phone Number": "(474) 879-5465",
        "Email": "posuere@nislsemconsequat.co.uk",
        "Address": "P.O. Box 684, 7899 Dui, Avenue"
    },
    {
        "Name": "Ethan",
        "Phone Number": "(108) 765-9355",
        "Email": "quis@velitegestaslacinia.com",
        "Address": "P.O. Box 121, 7169 In St."
    },
    {
        "Name": "Merrill",
        "Phone Number": "(247) 682-5959",
        "Email": "Integer.in.magna@liberoatauctor.edu",
        "Address": "144-208 Pellentesque. St."
    },
    {
        "Name": "Leroy",
        "Phone Number": "(563) 119-7637",
        "Email": "Suspendisse.non.leo@telluseu.org",
        "Address": "2204 Nunc St."
    },
    {
        "Name": "Dieter",
        "Phone Number": "(964) 201-1087",
        "Email": "mauris.erat@penatibuset.org",
        "Address": "Ap #685-1212 Faucibus Road"
    },
    {
        "Name": "Zephania",
        "Phone Number": "(976) 534-4773",
        "Email": "iaculis@nonarcuVivamus.co.uk",
        "Address": "393-9081 Egestas Av."
    },
    {
        "Name": "Lawrence",
        "Phone Number": "(521) 602-5629",
        "Email": "gravida.Aliquam.tincidunt@etmagnis.co.uk",
        "Address": "7738 Mi Road"
    },
    {
        "Name": "Cruz",
        "Phone Number": "(247) 821-3197",
        "Email": "libero@sit.edu",
        "Address": "593-3679 Erat Avenue"
    },
    {
        "Name": "Carlos",
        "Phone Number": "(672) 842-0859",
        "Email": "dolor@Duiscursus.co.uk",
        "Address": "P.O. Box 645, 2829 Purus Ave"
    },
    {
        "Name": "Ashton",
        "Phone Number": "(759) 291-8308",
        "Email": "lectus.quis.massa@tempus.ca",
        "Address": "P.O. Box 168, 7202 Id, St."
    },
    {
        "Name": "Amal",
        "Phone Number": "(653) 853-6054",
        "Email": "Proin@lectusquismassa.edu",
        "Address": "Ap #415-9285 Magnis Rd."
    },
    {
        "Name": "Brent",
        "Phone Number": "(584) 108-1844",
        "Email": "interdum.enim.non@ornare.edu",
        "Address": "1169 Fringilla St."
    },
    {
        "Name": "Lucius",
        "Phone Number": "(779) 960-0285",
        "Email": "Suspendisse.eleifend@noncursusnon.net",
        "Address": "5409 Non Rd."
    },
    {
        "Name": "Jesse",
        "Phone Number": "(985) 115-8903",
        "Email": "mus@Nulladignissim.edu",
        "Address": "Ap #493-5030 Nunc Rd."
    },
    {
        "Name": "Elliott",
        "Phone Number": "(650) 311-8249",
        "Email": "dui.lectus@amet.edu",
        "Address": "2807 Mauris, Rd."
    },
    {
        "Name": "Igor",
        "Phone Number": "(769) 311-0968",
        "Email": "egestas.a.dui@montesnasceturridiculus.ca",
        "Address": "Ap #508-3908 At, Av."
    },
    {
        "Name": "Derek",
        "Phone Number": "(704) 249-2124",
        "Email": "penatibus.et.magnis@ipsum.edu",
        "Address": "770-7241 Aliquet. St."
    },
    {
        "Name": "Sean",
        "Phone Number": "(110) 657-0651",
        "Email": "odio@euelit.ca",
        "Address": "Ap #512-9538 Dolor Avenue"
    },
    {
        "Name": "Steel",
        "Phone Number": "(650) 538-5794",
        "Email": "accumsan.convallis.ante@inlobortis.net",
        "Address": "2033 Aliquam Rd."
    },
    {
        "Name": "Seth",
        "Phone Number": "(736) 300-8727",
        "Email": "pharetra.sed.hendrerit@anteNunc.net",
        "Address": "Ap #201-9005 Aliquet Rd."
    },
    {
        "Name": "Hasad",
        "Phone Number": "(110) 341-9873",
        "Email": "egestas.Aliquam.fringilla@risusDonec.org",
        "Address": "658-1791 Luctus St."
    },
    {
        "Name": "Merritt",
        "Phone Number": "(302) 999-6294",
        "Email": "sed@nondapibusrutrum.com",
        "Address": "2693 Elit Avenue"
    },
    {
        "Name": "Brennan",
        "Phone Number": "(898) 196-7084",
        "Email": "euismod.est@posuerecubilia.net",
        "Address": "991-7815 Nibh. Road"
    },
    {
        "Name": "Price",
        "Phone Number": "(471) 573-3405",
        "Email": "Quisque.porttitor.eros@Donecconsectetuer.edu",
        "Address": "327-1472 Nulla Ave"
    },
    {
        "Name": "Castor",
        "Phone Number": "(903) 327-0701",
        "Email": "ante.Vivamus@vestibulumneceuismod.edu",
        "Address": "P.O. Box 905, 437 Odio Ave"
    },
    {
        "Name": "Oliver",
        "Phone Number": "(901) 247-4917",
        "Email": "blandit@miAliquam.co.uk",
        "Address": "6139 Erat St."
    },
    {
        "Name": "Harper",
        "Phone Number": "(881) 931-6080",
        "Email": "Nullam.vitae.diam@maurissapiencursus.org",
        "Address": "399-2689 Vitae Av."
    },
    {
        "Name": "Orson",
        "Phone Number": "(864) 421-4996",
        "Email": "et@hendrerita.org",
        "Address": "Ap #941-8814 Risus St."
    },
    {
        "Name": "Leonard",
        "Phone Number": "(784) 163-9973",
        "Email": "montes.nascetur@orciPhasellusdapibus.edu",
        "Address": "Ap #632-9223 Duis St."
    },
    {
        "Name": "Colin",
        "Phone Number": "(856) 813-7806",
        "Email": "Fusce.dolor@auctor.edu",
        "Address": "2336 Vel Street"
    },
    {
        "Name": "Nicholas",
        "Phone Number": "(863) 221-3426",
        "Email": "dolor.nonummy@orci.net",
        "Address": "4221 Cursus. St."
    },
    {
        "Name": "Orlando",
        "Phone Number": "(248) 286-4522",
        "Email": "euismod.est@rutrumjusto.co.uk",
        "Address": "931-5857 Imperdiet Road"
    },
    {
        "Name": "Jasper",
        "Phone Number": "(496) 903-2191",
        "Email": "Vestibulum@Proinnislsem.org",
        "Address": "P.O. Box 768, 3207 Laoreet, St."
    },
    {
        "Name": "Anthony",
        "Phone Number": "(219) 905-5948",
        "Email": "eleifend@gravida.edu",
        "Address": "Ap #151-4494 Metus Avenue"
    },
    {
        "Name": "Nasim",
        "Phone Number": "(412) 971-8582",
        "Email": "Mauris@consequatpurus.co.uk",
        "Address": "807-3137 Velit Ave"
    },
    {
        "Name": "Otto",
        "Phone Number": "(870) 561-9810",
        "Email": "lacus.Ut.nec@elitfermentum.org",
        "Address": "Ap #271-2553 Quis, Avenue"
    },
    {
        "Name": "Harding",
        "Phone Number": "(618) 937-0619",
        "Email": "Etiam@felis.edu",
        "Address": "P.O. Box 784, 1525 Accumsan Avenue"
    },
    {
        "Name": "Coby",
        "Phone Number": "(365) 265-2708",
        "Email": "Duis@aauctornon.net",
        "Address": "535-6700 Ac St."
    },
    {
        "Name": "Charles",
        "Phone Number": "(161) 857-9628",
        "Email": "interdum.Curabitur@ascelerisque.co.uk",
        "Address": "6827 Sit St."
    },
    {
        "Name": "Paki",
        "Phone Number": "(865) 204-2603",
        "Email": "erat.in@orciPhasellusdapibus.net",
        "Address": "1232 Molestie Rd."
    },
    {
        "Name": "Rooney",
        "Phone Number": "(408) 243-4762",
        "Email": "varius.Nam@nequeseddictum.ca",
        "Address": "Ap #480-9099 Lectus St."
    },
    {
        "Name": "Herrod",
        "Phone Number": "(523) 128-9919",
        "Email": "Nam.interdum.enim@purusMaecenaslibero.net",
        "Address": "Ap #431-174 Diam St."
    },
    {
        "Name": "Thomas",
        "Phone Number": "(151) 217-1377",
        "Email": "magna@Phasellus.com",
        "Address": "Ap #465-890 Feugiat. Rd."
    },
    {
        "Name": "Gil",
        "Phone Number": "(727) 939-0384",
        "Email": "magna.Phasellus.dolor@sit.ca",
        "Address": "P.O. Box 416, 9212 Curabitur Av."
    },
    {
        "Name": "Charles",
        "Phone Number": "(771) 777-8506",
        "Email": "Cras.dictum.ultricies@purusDuiselementum.ca",
        "Address": "9698 Blandit Road"
    },
    {
        "Name": "Cody",
        "Phone Number": "(555) 477-9162",
        "Email": "Cras.eu.tellus@Nullamscelerisque.org",
        "Address": "Ap #648-9993 Dui. Avenue"
    },
    {
        "Name": "Byron",
        "Phone Number": "(403) 401-7690",
        "Email": "nunc.sit@massa.org",
        "Address": "P.O. Box 783, 2022 Sodales Avenue"
    },
    {
        "Name": "Wang",
        "Phone Number": "(835) 355-2783",
        "Email": "ac.sem.ut@rutrum.edu",
        "Address": "Ap #497-4349 Eget Ave"
    },
    {
        "Name": "Paki",
        "Phone Number": "(507) 367-7512",
        "Email": "Sed@fermentumarcuVestibulum.org",
        "Address": "435-7695 Mus. Rd."
    },
    {
        "Name": "Thor",
        "Phone Number": "(359) 249-5774",
        "Email": "volutpat.Nulla@bibendumfermentummetus.com",
        "Address": "Ap #699-5713 Quisque Rd."
    }
];