function first_step(in, lenght) {
    if (in.in == 0) {
    in.i_ph = 4;
    in.i_s = 0;
    } else if (in.in > 0 && in.i_ph == 1 && in.i_c == 0) {
    in.i_s = lenght - 1;
    } else if (in.in > 0 && in.i_ph == 2 && in.i_c == 0) {
    in.i_s = 0;
    } else if (in.in > 0 && in.i_ph == 3 && in.i_c == 0) {
    in.i_s = (lenght - 1)  *  -1;
    } else if (in.in > 0 && in.i_ph == 4 && in.i_c == 0) {
    in.i_s = 0;
    } else if (in.in < 0 && in.i_ph == 1 && in.i_c == 0) {
    in.i_s = 1;
    } else if (in.in < 0 && in.i_ph == 2 && in.i_c == 0) {
    in.i_s = (lenght - 2);
    } else if (in.in < 0 && in.i_ph == 3 && in.i_c == 0) {
    in.i_s = -1;
    } else if (in.in < 0 && in.i_ph == 4 && in.i_c == 0) {
    in.i_s = (lenght - 2)  *  -1;
    } else if (in.i_ph == 1) {
    in.i_s = in.i_c;
    } else if (in.i_ph == 2) {
    in.i_s = (lenght - 1) - in.i_c;
    } else if (in.i_ph == 3) {
    in.i_s = in.i_c  *  -1;
    } else if (in.i_ph == 4) {
    in.i_s = ((lenght - 1) - in.i_c)  *  -1;
    }
    return in;
}

