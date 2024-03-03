#include "core.h"

void CORE::init() {
		buff_size  = 2048;  
		parallel_size = 16; 
		w_size = 2048;
		buff = new double[w_size*buff_size];  

		change_buff = new CHANGE_BUFF[1]; 
		change_buff->w_size = w_size;
		change_buff->init();
			
		delay = new DELAY[1]; 
		delay->parallel_size = &parallel_size;
		delay->buff = buff;  
		delay->w_size = w_size;   
		delay->init(); 
			
		line_function = new LINE_FUNCTION[1];
		line_function->buff = buff; 
		line_function->w_size = w_size; 
		line_function->otkuda = 0;
		line_function->kuda = 3;
		line_function->init();
		line_function->delay = delay;

		trigger = true; //����������� ������ 1 ��� �� w_size
};

void CORE::loop(double* in_L, double* in_R, double* out_L, double* out_R)   //����������
{  
		change_buff->in = in_L;  // ������� ������ IN
		change_buff->out = out_L;  // ������� ������ OUT
		change_buff->random = random;  //������� ������ ����
		change_buff->go_read(); // �������� ��� ��������� � READ
		

		//������������ ����� �������� W_SIZE �� WRITE ��� ������ �� ������ ������
		if(change_buff->count > 0 && change_buff->count <= w_size && trigger == true){
			for (int i = 0; i < change_buff->w_size; i++)
				change_buff->write[i+change_buff->w_size] = change_buff->read[i+change_buff->w_size];
			trigger = false;
		}else if(change_buff->count > change_buff->w_size && change_buff->count <= change_buff->size && trigger == false){
			for (int i = 0; i < change_buff->w_size; i++)
				change_buff->write[i] = change_buff->read[i];
			trigger = true;
		}
		

		// ��� ���� ���� �����, ������������ � ����� �������
		change_buff->go_write(); // ��������� � OUT �� WRITE
};
