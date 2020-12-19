package gta.winbo.wk123;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardServiceImple implements BoardService {

	@Inject
	private BoardDAO B;

	@Override
	public List<BoardVO> selectUser(BoardVO v) throws Exception {		
		return B.selectUser(v);
	}

	@Override
	public void insert(BoardVO v) throws Exception {
		B.insert(v);		
	}

	/*한 사용자가 메소드를 사용할 경우 다른 사용자는 사용 못하게 한다.*/
	@Transactional
	@Override
	public void update(BoardVO v) throws Exception {
		String [] updateData=v.getGridData().split("#");
		
		HashMap<String,String> map=new HashMap<String,String>();
		
		for(int i=0; i<updateData.length; i++) {
		
			String [] hasmapData=updateData[i].split("/");
			
			for(int j=1; j<hasmapData.length; j++) {
				
				String [] realhasmapData=hasmapData[j].split(",");
				map.put(realhasmapData[0], realhasmapData[1]);
				System.out.println(realhasmapData[1]);
				
			}
			B.update(map);
		}
		
		
	}
	
	
	@Override
	public void delete(BoardVO v) throws Exception {
		String[] realName = v.getName().split(",", -1);
		if (realName.length > 0) {
			for (String name : realName) {
				v.setName(name);
				B.delete(v);
			}
		}
	}



}
