#include "read.h"

READ::READ()
{
}

READ::~READ()
{
}
int READ::Initialize(void* params)
{
	m_pApplication = (Application*)params;

	// ������������� ����������

	return 1;
}

void READ::Terminate()
{
	// �������� ����������

}
void READ::core_read(){
	
		write->core_write();
		std::cout << "  wchannels   "<<w_l->wchannels<<"    i  "<<w_l->i_w<<"   j  "<<w_l->j_w<<"    wlen   "<<w_l->wlen<<"   dval   "<<w_l->dval<<std::endl ;
	
	stop = stop++;
	if (stop > 10)
		stop = 0;
	if(stop == 0){
		getchar();
	}
	
};
