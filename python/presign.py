import boto3
s3 = boto3.client('s3')

bucket = input("Bucket Name: ")
key= input("filename/key: ")

print(s3.generate_presigned_url('put_object', Params={'Bucket':bucket,'Key':key}, ExpiresIn=3600, HttpMethod='PUT'))
