function OSC_osc_relation() {
    if (osc_cb.first_param == 1) {
        for (let i = 0; i < 8; i++) {
            osc_lp[i].in = osc_p[i].lenght  *  osc_substrate_s.quarter[i] + osc_substrate_s.step_phase[i];
            osc_lp[i].in_pos = osc_lp[i].in;
            if (osc_lp[i].in_pos < 0) {
                osc_lp[i].in_pos = osc_lp[i].in_pos  *  -1;
            }
        }
        for (let i = 0; i < 8; i++) {
            osc_lp[i].i_ph = ((osc_lp[i].in_pos / osc_p[i].lenght) - (((osc_lp[i].in_pos / osc_p[i].lenght) / 4))  *  4) + 1;
            osc_lp[i].i_c = osc_lp[i].in_pos - ((Math.floor(osc_lp[i].in_pos / osc_p[i].lenght))  *  osc_p[i].lenght);
            osc_lp[i] = first_step(osc_lp[i], osc_p[i].lenght);
        }
        osc_cb.first_param = 0;
    } else {
        for (let i = 0; i < 8; i++) {
            if (osc_lp[i].in >= 0) {
                osc_lp[i] = up(osc_lp[i], osc_p[i].lenght);
                osc_lp[i] = state(osc_lp[i], osc_p[i].lenght);
            } else if (osc_lp[i].in < 0) {
                osc_lp[i] = down(osc_lp[i], osc_p[i].lenght);
                osc_lp[i] = state(osc_lp[i], osc_p[i].lenght);
            }
        }
    }
}

