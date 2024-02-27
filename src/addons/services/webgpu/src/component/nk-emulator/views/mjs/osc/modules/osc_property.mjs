function OSC() {
    this.osc_property = function() {
        for (let i = 0; i < 8; i++) {
            this.osc_out[i].line = this.osc_lp[i].i_s  *  this.osc_substrate_s.step[i]  *  this.osc_p[i].norm;
            this.osc_out[i].line_sin = square_sin(this.osc_out[i].line, this.osc_lp[i].i_ph, this.osc_p[i].up_lim  *  this.osc_p[i].norm);
            this.osc_out[i].sin_cos = sin(this.osc_lp[i].i_s  *  this.osc_sp01[i].rad)  *  this.osc_sp01[i].norm_sin_cos;
        }

        ////////////////////////////////////////////
        this.osc_sp01[0].t++;
        if (this.osc_sp01[0].t > (this.osc_sp01[0].T - 1)) {
            this.osc_sp01[0].t = 0;
        }

        this.osc_out[0].sin = 1  *  sin(this.osc_sp01[0].w_0  *  this.osc_sp01[0].t + 0.0);
        this.osc_out[1].sin = 1  *  cos(this.osc_sp01[1].w_0  *  this.osc_sp01[0].t + 0.25);
        this.osc_out[2].sin = 1  *  sin(this.osc_sp01[2].w_0  *  this.osc_sp01[0].t + 0.5);
        this.osc_out[3].sin = 1  *  cos(this.osc_sp01[3].w_0  *  this.osc_sp01[0].t + 1.25);

        ///////////////////////

        this.osc_sp02[0].t++;
        for (let i = 0; i < 8; i++) {
            if (this.osc_sp02[0].t > (this.osc_substrate_s.deg[i] - 1)) {
                this.osc_sp02[0].t = 0;
            }
        }

        this.osc_out[0].sin_deg = 1  *  sin(this.osc_sp02[0].rad  *  this.osc_sp02[0].t);
        this.osc_out[1].cos_deg = 1  *  cos(this.osc_sp02[0].rad  *  this.osc_sp02[0].t);
    };
}

