json.array!(@patients) do |patient|
  json.extract! patient, :id, :firstname, :lastname, :number, :facility, :site, :doa, :dob, :dod, :updated_by
  json.url patient_url(patient, format: :json)
end
