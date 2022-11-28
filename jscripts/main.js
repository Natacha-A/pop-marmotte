const app = Vue.createApp({
    data() {
        return {
            nb: 15
        }
    },
    mounted() {

        //callback semblable à une promesse
        this.$nextTick( () => {

            //Attendre 200ms avant d'appeler la méthode popMarmotte
            setTimeout( () => {

                this.popMarmotte();
                console.log("mounted");
            }, 200);
        });
    },
    methods: {
        //Méthode random et references marmotte
        popMarmotte(index = -1) {
            
            //Si la valeur de l'id de la marmotte = à celle dans l'index faire apparaître une autre marmotte
            do { var marmotteID = Math.round(Math.random() * this.nb) + 1; }
            while(marmotteID == index );

            //Récupérer la référence avec le nombre récupéré dans marmotteID
            this.$refs.marmotte[marmotteID-1].getOut();
            console.log("popMarmotte");
    
        }
    }
});


app.component('marmotte', {
    props: ['num'],
    data() {
        return {
            state: 'in',
            scream: null,
            byeBitch: null,
        }
    },

    //Méthode pour ajouter l'audio
    created() {

        //Mettre le son dans la propriété scream du component (Aka. l'enfant de l'app)
        this.scream = new Audio('sounds/marmotte.mp3');
    },

    methods: {
        //Instructions quand tu survole une marmotte avec ta sourri
        hover() {

            //Si la marmotte est sortie, reset le timer, exécuter la méthode getin()
            if(this.state == 'out') {

                clearTimeout(this.byeBitch);

                //Jouer le son de la marmotte
                this.scream.play();

                this.getIn();

                //Communiquer avec le parent à l'aide de $emit
                this.$emit('getin');
            }
        },

        //Méthode à exécuter pour faire sortir la marmotte du trou
        getOut() {

            //Changer l'état du component de la marmotte à out et ajouter la classe --out au trou-container
            this.state = 'out';

            //Récupérer l'id du component de la marmotte (marmotte_) (dans html) et sont numéro
            //Ajouter la classe trou-container--out au trou-container
            //Récupérer l'id de l'enfant et sont numéro et ajouter la class trou-container--out
            document.getElementById('marmotte_' + this.num)
                .classList.add('trou-container--out');
            
            //Mettre un timer sur la propriété exécuté lors du survole
            this.byeBitch = setTimeout( () => {

                //Appeler la méthode getIn
                this.getIn();

                //L'enfant communique avec le parent pour lui dire de faire rentrée la marmotte sortie
                this.$emit('getin');
            },   //Random??
                Math.round(Math.random() * 4000 ) + 1000);

        },

        //Méthode à exécuter pour faire rentrée la marmotte dans le trou
        getIn() {
            this.state = 'in';

            //Retirer la classe trou-container--out
            document.getElementById('marmotte_' + this.num)
                .classList.remove('trou-container--out');
        }
    },
    //template = comme boucle js. Fait afficher plusieurs éléments avec un petit bloc de code
    template: 
    `<div :id="'marmotte_'+num" class="trou-container" @mouseover="hover()">
        <div class="trou">
            <div class="sol"></div>
            <div class="marmotte"></div>
        </div>
    </div>`
});


app.mount('#champ');