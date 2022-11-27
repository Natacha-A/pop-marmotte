const app = Vue.createApp({
    data() {
        return {
            nb: 15
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.popMarmotte();
            }, 200);
        });
    },
    methods: {
        //Méthode random et references marmotte
        popMarmotte(index = -1) {
            do { var marmotteId = Math.floor(Math.random() * this.nb) - 1; } 
            while(marmotteId == index);
            this.$refs.marmotte[marmotteId - 1].getOut();
        }
    }
});


app.component('marmotte', {
    props: ['num'],
    data() {
        return {
            state: 'in',
            scream: null, //Propriété pour l'audio
            byeBitch: null, //Pour propriété pour le bye bitch 
        }
    },
    //Méthode pour ajouter l'audio
    created() {
        this.scream = new Audio('sounds/marmotte.mp3');
    },
    methods: {
        //Instructions quand tu survole une marmotte avec ta sourri
        hover() {

            //Si la marmotte est sortie, reset le timer, exécuter la méthode getin()
            if(this.state == 'out') {
                
            }
        },

        //Méthode à exécuter pour faire sortir la marmotte du trou
        getOut() {

            //Changer l'état du component de la marmotte à out et ajouter la classe --out au trou-container
            this.state = 'out';

            //Récupérer l'id du component de la marmotte (marmotte_) (dans html) et sont numéro
            //Ajouter la classe trou-container--out au trou-container
            document.getElementById('marmotte_' + this.num)
            .classList.add('trou-container--out');

        },

        //Méthode à exécuter pour faire rentrée la marmotte dans le trou
        getIn() {
            this.state = 'in';

            //Retirer la classe trou-container--out
            document.getElementById('marmotte_' + this.num)
            .classList.remove('trou-container--out');
        }
    },
    template: 
    `<div :id="'marmotte_'+num"  class="trou-container" @mouveover="hover()">
        <div class="trou">
            <div class="sol"></div>
            <div class="marmotte"></div>
        </div>
    </div>`
});


app.mount('#champ');