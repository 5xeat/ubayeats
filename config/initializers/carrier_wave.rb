CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws' #required
  config.fog_credentials = {
    provider:              'AWS', #required
    aws_access_key_id:     'xxx', 
    #required unless using use_iam_profile
    aws_secret_access_key: 'yyy', 
    #required unless using use_iam_profile
    use_iam_profile:       true,  #optional, defaults to false
    region: 'us-west-1', #optional, defaults to 'us-east-1'
    host: 's3-us-west-1.amazonaws.com', #optional, defaults to nil
    endpoint: 'https://s3.example.com:8080' #optional, defaults to nil
  }
  config.fog_directory  = 'name_of_bucket'  #required
  config.fog_public     = false  #optional, defaults to true