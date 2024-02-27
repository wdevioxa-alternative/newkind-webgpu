function OSC() {
    this.osc_cb = {
        first_param: 1
    };
    this.osc_sp01 = [
        { t: -1 }
    ];
    this.osc_sp02 = [
        { t: -1 }
    ];

    let l = 0;

    for (let i = 0; i < 8; i++) {
        while (this.osc_p[i].up_lim <= 1 - this.osc_substrate_s.step[i]) {
            this.osc_p[i].up_lim = this.osc_substrate_s.step[i]  *  l;
            l++;
            this.osc_p[i].lenght = l;
        }

        this.osc_p[i].norm = 1 / this.osc_p[i].up_lim;
    }

    for (let i = 0; i < 8; i++) {
        this.osc_out[i].line = 0;
        this.osc_out[i].line_sin = 0;
        this.osc_out[i].sin_cos = 0;
        this.osc_out[i].sin = 0;
        this.osc_out[i].cos = 0;
        this.osc_out[i].sin_deg = 0;
        this.osc_out[i].cos_deg = 0;
    }
}

OSC.prototype.init = function() {
    // Ваш код здесь
};

