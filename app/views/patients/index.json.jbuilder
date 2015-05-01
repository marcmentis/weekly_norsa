json.array!(@patients) do |patient|
  json.extract! patient, :id, :firstname, :lastname, :number, :facility, :ward, :doa, :dob, :dod, :updated_by, :facility, :ward
  json.url patient_url(patient, format: :json)
end
