function OSC() {
    this.osc_core = function(init, change_phase, third) {
        if (init == 1) {
            this.osc_cb.first_param = 1;
        } else {
            this.osc_cb.first_param = 0;
        }

        if (change_phase == 1) {
            this.osc_cb.change_phase = 1;
        } else {
            this.osc_cb.change_phase = 0;
        }

        if (third == 1) {
            this.osc_cb.third = 1;
        } else {
            this.osc_cb.third = 0;
        }

        this.osc_relation();
        this.osc_property();

        //parent.common.show_00(osc_lp[0].i_ph, osc_lp[0].i_c, osc_lp[0].i_s, osc_lp[1].i_ph, osc_lp[1].i_c, osc_lp[1].i_s, osc_lp[2].i_ph, osc_lp[2].i_c, osc_lp[2].i_s, 0, 0, 0, 0, 0, 0, 10, 0);
    };
}

