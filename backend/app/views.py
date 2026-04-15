from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import preprocess_and_predict

@api_view(['POST'])
def predict_performance(request):
    try:
        data = request.data
        required_fields = ['hours_studied', 'previous_scores', 'sleep_hours', 'extracurricular_activities', 'practice_papers']
        
        # Validation
        for field in required_fields:
            if field not in data:
                return Response(
                    {"error": f"Missing required field: {field}"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            if data[field] is None:
                return Response(
                    {"error": f"Field '{field}' cannot be null."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        score, performance = preprocess_and_predict(data)
        
        return Response({
            "predicted_score": round(score, 2),
            "performance": performance
        }, status=status.HTTP_200_OK)
        
    except ValueError as e:
        return Response({"error": "Invalid input format. Ensure all inputs are numeric."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
