package gta.winbo.wk123;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
public class RamdaTest {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List< Integer > x_align = new ArrayList< Integer >();
		x_align.add( 2 ); 
		x_align.add( 3 ); 
		x_align.add( 4 ); 
		x_align.add( 5 ); 
		x_align.add( 6 ); 
		x_align.add( 7 ); 
		x_align.add( 8 ); 
		x_align.add( 9 );
		List< Integer > y_align = new ArrayList< Integer >();
		y_align.add( 1 );
		y_align.add( 2 );
		y_align.add( 3 ); 
		y_align.add( 4 ); 
		y_align.add( 5 ); 
		y_align.add( 6 ); 
		y_align.add( 7 ); 
		y_align.add( 8 ); 
		y_align.add( 9 );
		
		List< List< Integer > > gradeList = new ArrayList< List< Integer > >();
//      버전이 맞으면 작동 한다.		
//		gradeList=x_align.stream()
//				.map(a -> y_align.stream()
//				.map( b -> a*b  )
//				.filter(c -> c%2 ==0 ).collect(Collectors.toList()))
//				.collect(Collectors.toList());	
		
		 for( List<Integer> list : gradeList ) { 
			 System.out.println( list );
		}						
	}
}
