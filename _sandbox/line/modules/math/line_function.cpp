#include "line_function.h"
#include "functions.h"

//�������������
void LINE_FUNCTION::init()
{
		old_s0 = 0;
		old_s1 = 0;
		old_s2 = 0;
		old_0 = 0;
		count_sample_0 = 0;
		count_0 = 0;
		square_info_0 = new double[w_size*5*2];
		set_0(square_info_0, w_size*5*2);
		old_4 = 0;
		count_sample_4 = 0;
		count_4 = 0;
		pick_4 = 0;
		pick_4_old1 = 0;
		pick_4_old2 = 0;
		pick_4_future1 = 0;
		pick_4_future2 = 0;
		size_4 = 0;
		count_5 = 0;
		old_5 = 0;
		polar_count = 0;
		old_12 = 0;
		old_13 = 0;
								
		//��������� ���������� ��� �����
		//��������� ������
		kosie = new KOSIE[2];    // ������ �������
		// 1� �����
		kosie[0].w_size = w_size;
		kosie[0].kuda = kuda;
		kosie[0].buff = buff;
		kosie[0].square_info_0 = square_info_0;
		kosie[0].init();
		//�������������� (����� ������ ������� ������ �����)
		kosie[0].line1 = 6; 
		kosie[0].line2 = 7;
		kosie[0].line3 = 9; 
		kosie[0].line4 = 10;
		kosie[0].save = 18;  // ���� ��������� 8 ������ 
		// 2� �����  ���� ����� ������ �� ����� 0 ������ 1  � ��....
		kosie[1].w_size = w_size;
		kosie[1].kuda = kuda;
		kosie[1].buff = buff;
		kosie[1].square_info_0 = square_info_0;
		kosie[1].init();
		//�������������� (����� ������ ������� ������ �����)
		kosie[1].line1 = 6; 
		kosie[1].line2 = 7;
		kosie[1].line3 = 9; 
		kosie[1].line4 = 10;
		kosie[1].save = 26;  // ���� ��������� 8 ������ 
};
		
// ����� �����
void LINE_FUNCTION::line_core(int i)   // ����� ������� 3 ������� �������� � ������
{  
//_______________ ����� ��� ��������_________________________
		//_______ �������� ��� delay
		//s ���������� ��� ��������
		double s0 = buff[i+(otkuda+0)*w_size];
		double s1 = buff[i+(otkuda+1)*w_size];
		double s2 = buff[i+(otkuda+2)*w_size];

		//______0 ������� ��� ��������
		if(s1 > 0 && old_0 > 0)   
				buff[i+(kuda+0)*w_size] = 1;   // +
		else if(s1 < 0 && old_0 < 0)
				buff[i+(kuda+0)*w_size] = -1;   // -
		else if(old_0 <= 0 && s1 > 0)
				buff[i+(kuda+0)*w_size] = 1;   // +
		else if(old_0 >= 0 && s1 < 0)
				buff[i+(kuda+0)*w_size] = -1;   // -
		else if(old_0 < 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = old_0;   //������ �� ������ 0
		else if(old_0 > 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = old_0;   //������ �� ������ 0
		else if(old_0 == 0 && s1 == 0)
				buff[i+(kuda+0)*w_size] = 0;   //0

		// ������� ������������� ����� � s0 s1 s2
		if(buff[i+(otkuda+0)*w_size] < 0) 
				s0 *= -1;
		if(buff[i+(otkuda+1)*w_size] < 0) 
				s1 *= -1;
		if(buff[i+(otkuda+2)*w_size] < 0) 
				s2 *= -1;

		//_______________  ���� ���� ���������� � 0 ��������
		if(buff[i+(kuda+0)*w_size] != old_0){   // ����� ������� 
				if(count_sample_0 > 0)  // ������ �������� ��������
						square_info_0[count_0*5*2 + 0*2 + 0] = count_sample_0;
				//���� ������� �������� ��������
				square_info_0[count_0*5*2 + 2*3 + 1] = s2; // ��������� �����
	
				count_0++;   // �ר� ���������
				if(count_0 > w_size)  // ���� ���� ��������� ������  w_size  �������� ������
						count_0 = 0;
				count_sample_0 = 0; // �������� ������� �������
								
				//���� ������� �������� ��������
				square_info_0[count_0*5*2 + 2*3 + 0] = s1; // ������ �����
		};		
						
		// ����� ���������
		if(s1 > square_info_0[count_0*5*2 + 2*1 + 0]) {
				square_info_0[count_0*5*2 + 2*1 + 0] = s1;   // ���������
				square_info_0[count_0*5*2 + 2*1 + 1] = count_sample_0;		// ����� ������
				//���-��� ��������
				square_info_0[count_0*5*2 + 2*4 + 0] = s2;  // ����� ����� �����
				// ����� ����� ����
				square_info_0[count_0*5*2 + 2*4 + 1] = s0;  // ����� ����� ����
		};
												
		//__________________���� �������______________
		if(buff[i+(kuda+0)*w_size] != 0)   // ����� �������� INIT
				count_sample_0++;
						


		//_______________ �����  ��������_________________________
		//_______________  1 2 3  �������� ������� �� 1 c����
		//d ���������� ��� ��������

		delay->delay_signal(otkuda+0, kuda+1, w_size, 0, i);  //����������� ������ �� ����
		delay->delay_signal(otkuda+1, kuda+2, w_size, 1, i);  //����������� ������ �� ����
		delay->delay_signal(otkuda+2, kuda+3, w_size, 2, i);  //����������� ������ �� ����

		double d0 = buff[i+(kuda+1)*w_size];
		double d1 = buff[i+(kuda+2)*w_size];
		double d2 = buff[i+(kuda+3)*w_size];

		//______4 ������� c ���������
		if(d1 > 0 && old_4 > 0)   
				buff[i+(kuda+4)*w_size] = 1;   // +
		else if(d1 < 0 && old_4 < 0)
				buff[i+(kuda+4)*w_size] = -1;   // -
		else if(old_4 <= 0 && d1 > 0)
				buff[i+(kuda+4)*w_size] = 1;   // +
		else if(old_4 >= 0 && d1 < 0)
				buff[i+(kuda+4)*w_size] = -1;   // -
		else if(old_4 < 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = old_4;   //������ �� ������ 0
		else if(old_4 > 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = old_4;   //������ �� ������ 0
		else if(old_4 == 0 && d1 == 0)
				buff[i+(kuda+4)*w_size] = 0;   //0

		// ������� ������������� �����
		if(buff[i+(kuda+1)*w_size] < 0) 
				d0 = buff[i+(kuda+1)*w_size] *= -1;
		if(buff[i+(kuda+2)*w_size] < 0) 
				d1 = buff[i+(kuda+2)*w_size] *= -1;
		if(buff[i+(kuda+3)*w_size] < 0) 
				d2 = buff[i+(kuda+3)*w_size] *= -1;


		//_______________  ���� ���� ���������� � �������� 4
		if(buff[i+(kuda+4)*w_size] != old_4){   // ����� ������� 
				//�������
				pick_4_old2 = pick_4_old1;  // ����������� ���
				pick_4_old1 = pick_4;   // ������� ���
						
				//_____������ ��������
   				square_info_0[count_4*5*2 + 2*0 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*1 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*1 + 1] = 0; 
				square_info_0[count_4*5*2 + 2*2 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*2 + 1] = 0;  
				square_info_0[count_4*5*2 + 2*3 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*3 + 1] = 0;  
				square_info_0[count_4*5*2 + 2*4 + 0] = 0; 
				square_info_0[count_4*5*2 + 2*4 + 1] = 0;  
				pick_4 = 0;
				size_4 = 0;
				count_sample_4 = 0;
				//______________________

				count_4++;   // ������� ���������
				if(count_4 > w_size)
						count_4 = 0;
										
				//���������
				pick_4 = square_info_0[count_4*5*2 + 2*1 + 0]; 
				size_4 = (int)square_info_0[count_4*5*2 + 2*1 + 1]; 
								
				//�������
				if(count_4 + 1 > w_size )
						pick_4_future1 = square_info_0[0*5*2 + 2*1 + 0]; // ���� ������� ��� �� ������ 
				else
						pick_4_future1 = square_info_0[(count_4+1)*5*2 + 2*1 + 0]; // ���� ������� ��� �� ������ 
										
				if(count_4 + 2 == w_size+2 )
						pick_4_future2 = square_info_0[1*5*2 + 2*1 + 0]; // ���� ������� ��� �� ������ 
				else if(count_4 + 2 == w_size+1 )
						pick_4_future2 = square_info_0[0*5*2 + 2*1 + 0]; // ���� ������� ��� �� ������ 
				else
						pick_4_future2 = square_info_0[(count_4+2)*5*2 + 2*1 + 0]; // ���� ������� ��� �� ������ 
		};	
						
		//__________________���� �������______________
		if(buff[i+(kuda+4)*w_size] != 0)   // ������� �������
				count_sample_4++;

		//_______________  5 ������� �� ������������ �����
		if(count_sample_4 == size_4+1 && buff[i+(kuda+4)*w_size] != 0) {
				if(count_5 == 0)
						count_5 = 1;
				else if(count_5 == 1)
						count_5 = -1;
				else if(count_5 == -1)
						count_5 = 1;
				buff[i+(kuda+5)*w_size] = count_5;
		} else {
				buff[i+(kuda+5)*w_size] = count_5;
		};

		//_______________  �ר���� �����������	(4 3 2 1)
		if(buff[i+(kuda+4)*w_size] != 0 && polar_count == 0){ // ���� ������ 1 ���� � ���������� 0 ��������
				if(buff[i+(kuda+4)*w_size] > 0)
						polar_count = 4;
				else if(buff[i+(kuda+4)*w_size] < 0)
						polar_count = 2;
		}else if(buff[i+(kuda+4)*w_size] != old_4 ) {  // ����� ��������
				if(buff[i+(kuda+4)*w_size] > 0)
						polar_count = 4;
				else if(buff[i+(kuda+4)*w_size] < 0)
						polar_count = 2;
		}else if(count_sample_4 == square_info_0[count_4*5*2 + 2*1 + 1] && buff[i+(kuda+4)*w_size] != 0) {  // ����� ��������
				if(polar_count == 4)
						polar_count = 3;
				else if(polar_count == 2)
						polar_count = 1;
		};
						
		//_____________________6 7 8 9 10 11 ����� 
			
		if(polar_count == 4 || polar_count == 2){
				buff[i+(kuda+6)*w_size] = pick_4;
				buff[i+(kuda+7)*w_size] = pick_4_future1;
				buff[i+(kuda+8)*w_size] = pick_4_old1;
								
				buff[i+(kuda+30)*w_size] = pick_4_future2;
				buff[i+(kuda+31)*w_size] = pick_4_old2;
		};
						
		if(polar_count == 3 || polar_count == 1){
				buff[i+(kuda+9)*w_size] = pick_4;
				buff[i+(kuda+10)*w_size] = pick_4_future1;
				buff[i+(kuda+11)*w_size] = pick_4_old1;
								
				buff[i+(kuda+32)*w_size] = pick_4_future2;
				buff[i+(kuda+33)*w_size] = pick_4_old2;
		};

		//_______________  12 13 �����  �� ������� ������ � ���������� � ��������
		if(buff[i+(kuda+4)*w_size] != 0) {  // ���� ���� ������� �� 1 �������
				if(buff[i+(kuda+4)*w_size] != old_4 || buff[i+(kuda+5)*w_size] != old_5) {  // ���� �������� ������� �� 0 ��� �� �������������
						if(polar_count == 4 || polar_count == 2){
								old_12 = square_info_0[count_4*5*2 + 2*3 + 0];
								old_13 = 0;
						} else if(polar_count == 3 || polar_count == 1) {
								old_12 = 0;
								old_13 = square_info_0[count_4*5*2 + 2*3 + 1];
						};
				};
				buff[i+(kuda+12)*w_size] = old_12;
				buff[i+(kuda+13)*w_size] = old_13;
		};

		//_______________  14 15 16 17  ����� �� ��� ���� ������ � ����� ������ ��������  �������� ������ ����� ��� 
			
		if(polar_count == 4 || polar_count == 2){
				buff[i+(kuda+14)*w_size] = square_info_0[count_4*5*2 + 2*4 + 0];
				buff[i+(kuda+15)*w_size] = square_info_0[count_4*5*2 + 2*4 + 1];
		}
			
		if(polar_count == 3 || polar_count == 1){
				buff[i+(kuda+16)*w_size] = square_info_0[count_4*5*2 + 2*4 + 1];
				buff[i+(kuda+17)*w_size] = square_info_0[count_4*5*2 + 2*4 + 0];
		};

		if(count_sample_4 == square_info_0[count_4*5*2 + 2*1 + 1]){
				buff[i+(kuda+14)*w_size] = 0;
				buff[i+(kuda+15)*w_size] = 0;
				buff[i+(kuda+16)*w_size] = 0;
				buff[i+(kuda+17)*w_size] = 0;
		};

		//________________ �����
		//�������� ������������ ������
		//1� �����
		kosie[0].i = i;
		kosie[0].count_4 = count_4;
		kosie[0].start();
		//2� �����
		kosie[1].i = i;
		kosie[1].count_4 = count_4;
		kosie[1].start();

		//___________�������
		old_s0 = s0;
		old_s1 = s1;
		old_s2 = s2;
		old_0 = buff[i+(kuda+0)*w_size];
		old_4 = buff[i+(kuda+4)*w_size];
		old_5 = buff[i+(kuda+5)*w_size];
		old_12 = buff[i+(kuda+12)*w_size];
		old_13 = buff[i+(kuda+13)*w_size];
};	
